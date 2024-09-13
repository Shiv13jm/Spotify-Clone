import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext= createContext();

const PlayerContextProvider = (props)=>{
     const audioRef= useRef();
     const seekBg= useRef();
     const seekBar= useRef();

     const [track, setTrack] = useState(songsData[0]);
     const [playstatus, setPlaystatus] = useState(false);
     const [time, setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0 ,
            minute:0
        }
     })
     const play=()=>{
        audioRef.current.play();
        setPlaystatus(true);
     }
     const pause=()=>{
        audioRef.current.pause();
        setPlaystatus(false);
     }
     useEffect(()=>{
        setTimeout(()=>{

            audioRef.current.ontimeupdate=()=>{
                setTime({
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime%60),
                        minute: Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime:{ 
                        second: Math.floor(audioRef.current.duration%60),
                        minute: Math.floor(audioRef.current.duration/60)
                    }
                 })
            }
        },1000);
     },[audioRef])
     const ContextValue= {
        audioRef,
        seekBar,
        seekBg,
        track,setTrack,
        playstatus,setPlaystatus,
        time,setTime,
        play,pause

     }
     return (
        <PlayerContext.Provider value ={ContextValue}>
        {props.children}
        </PlayerContext.Provider>
     )
}
export default PlayerContextProvider;