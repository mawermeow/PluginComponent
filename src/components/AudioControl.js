import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {useEffect, useRef, useState} from "react";
import delay from "../utils/delay";

const AudioControl=()=>{
    const {isPlayAudio}=useSnapshot(proxyState.ui)
    const audioRef = useRef(null);
    const [isClicked,setIsClicked]=useState(false)
    const [isLoaded,setIsLoaded]=useState(false)

    const handleClick = () => {
        setIsClicked(true)
        audioRef.current.play()
    }

    useEffect(() => {
        if(isLoaded&&isClicked&&audioRef.current){
            if(isPlayAudio){
                audioRef.current.play()
            }else{
                audioRef.current.pause()
            }
        }
    }, [isPlayAudio])

    return <div className="opacity-0">
        {isLoaded&&!isClicked && <div className="fixed inset-0 z-[100] pointer-events-auto" onClick={handleClick}></div>}
        <audio
            onLoadedData={()=>setIsLoaded(true)}
            loop
            ref={audioRef} className="pointer-events-none" src="./medias/music.mp3" />
    </div>
}
export default AudioControl