import {useSnapshot} from "valtio";
import {windowSizeState} from "../utils/windowSize";
import {useEffect, useRef, useState} from "react";
import {mouseScroll, screenDrag} from "../utils/krpano";
import delay from "../utils/delay";
import {proxyState} from "../App";

const Intro=()=>{
    const {isPlayAudio}=useSnapshot(proxyState.ui)
    const audioRef = useRef(null);
    const [isClicked,setIsClicked]=useState(false)
    const [isLoaded,setIsLoaded]=useState(false)

    const playAudio = () => {
        setIsClicked(true)
        audioRef.current.play()
    }

    useEffect(() => {
        if(isLoaded&&isClicked&&audioRef.current){
            if(isPlayAudio){
                audioRef.current.play()
                audioRef.current.volume = 0.5
            }else{
                audioRef.current.pause()
            }
        }
    }, [isPlayAudio])

    const{md}=useSnapshot(windowSizeState)
    const [isTeaching,setIsTeaching]=useState(true)
    const [teached,setTeached]=useState(false)
    const [showTeachOne,setShowTeachOne]=useState(true)
    const [isShowIntro,setIsShowIntro]=useState(true)


    useEffect(()=>{
        setIsTeaching(true)
    },[])

    const controlKrpano=async ()=>{
        await screenDrag()
        await delay(1000)
        setShowTeachOne(false)
        await mouseScroll()
        await delay(1000)
        setTeached(true)
        setIsTeaching(false)
    }
    useEffect(()=>{
        if(isTeaching){
            controlKrpano()
        }
    },[])


    if(md&&!teached){
        return <div className="fixed inset-0 flex items-center justify-center pointer-events-auto bg-black/60">
            <div className="max-w-[500px] h-max relative">
                <img className={`absolute w-full object-contain ${showTeachOne?'opacity-100':'opacity-0'}`} src="./images/intro/intro1.png"/>
                <img className={`w-full object-contain ${!showTeachOne?'opacity-100':'opacity-0'}`} src="./images/intro/intro2.png"/>
                <div className="absolute w-[120px] z-50 top-0 right-11 group cursor-pointer"
                     onClick={()=>{
                         setTeached(true)
                         setIsTeaching(false)
                     }}
                >
                    <img className="absolute w-full object-contain group-hover:opacity-0" src="./images/intro/skip.png"/>
                    <img className="w-full object-contain opacity-0 group-hover:opacity-100" src="./images/intro/skip_h.png"/>
                </div>
            </div>

            {/*<div className="md:min-w-[700px] h-max relative">*/}
            {/*    <img className="w-full object-contain" src="./images/intro/intro2.png"/>*/}
            {/*</div>*/}
        </div>
    }

    return <>
        <div className={`fixed inset-0 flex items-center justify-center bg-black/60 ${isShowIntro?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`}>
            <div className={`max-w-[500px] h-max relative group cursor-pointer ${isShowIntro?'pointer-events-auto':'pointer-events-none'}`}
                 onClick={()=>{
                     setIsShowIntro(false)
                     playAudio()
                 }}
            >
                <img className="absolute w-full object-contain group-hover:opacity-0" src="./images/intro/start.png"/>
                <img className="w-full object-contain opacity-0 group-hover:opacity-100" src="./images/intro/start_h.png"/>
            </div>

            {/*<div className="md:min-w-[700px] h-max relative">*/}
            {/*    <img className="w-full object-contain" src="./images/intro/intro2.png"/>*/}
            {/*</div>*/}
        </div>
        <audio
            onLoadedData={()=>setIsLoaded(true)}
            loop
            ref={audioRef} className="pointer-events-none w-0 h-0" src="./medias/music.mp3" />
    </>
}
export default Intro