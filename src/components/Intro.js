import {useSnapshot} from "valtio";
import {windowSizeState} from "../utils/windowSize";
import {useEffect, useRef, useState} from "react";
import {mouseScroll, screenDrag} from "../utils/krpano";
import delay from "../utils/delay";
import {proxyState} from "../App";
import {motion,AnimatePresence} from "framer-motion";

const Intro=()=>{
    const {isPlayAudio,isShowIntro}=useSnapshot(proxyState.ui)
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


    useEffect(()=>{
        setIsTeaching(true)
    },[])

    const controlKrpano=async ()=>{
        if(md) {
            await screenDrag()
            await delay(1000)
            setShowTeachOne(false)
            await mouseScroll()
            await delay(1000)
            setTeached(true)
            setIsTeaching(false)
        }
    }
    useEffect(()=>{
        if(isTeaching){
            const frontMask = document.getElementById('frontMask')
            if(frontMask){
                frontMask.parentNode.removeChild(frontMask)
            }
            controlKrpano()
        }
    },[])

    return <>
        <AnimatePresence>{isShowIntro&&<motion.div
            className="fixed inset-0 bg-black/60"
            initial={{opacity:1}}
            animate={{opacity:1}}
            exit={{opacity:0}}
        />}</AnimatePresence>
        <AnimatePresence>
            {(!md||teached)&&isShowIntro&&<motion.div
                className={`fixed inset-0 flex items-center justify-center pointer-events-auto`}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
            >
                <div className={`max-w-[500px] h-max relative group cursor-pointer`}
                     onClick={()=>{
                         proxyState.ui.isShowIntro = false
                         playAudio()
                     }}
                >
                    <img className="select-none absolute w-full object-contain group-hover:opacity-0" src="./images/intro/start.png"/>
                    <img className="select-none w-full object-contain opacity-0 group-hover:opacity-100" src="./images/intro/start_h.png"/>
                </div>
            </motion.div>}
        </AnimatePresence>
        <AnimatePresence>
            {(md&&!teached)&&isShowIntro&&<motion.div
                className="fixed inset-0 flex items-center justify-center pointer-events-auto"
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
            >
                <div className="max-w-[500px] h-max relative">
                    <img className={`select-none absolute w-full object-contain ${showTeachOne?'opacity-100':'opacity-0'}`} src="./images/intro/intro1.png"/>
                    <img className={`select-none w-full object-contain ${!showTeachOne?'opacity-100':'opacity-0'}`} src="./images/intro/intro2.png"/>
                    {/*skip*/}
                    <div className="absolute w-[120px] z-50 top-0 right-11 group cursor-pointer"
                        onClick={()=>{
                            setTeached(true)
                            setIsTeaching(false)
                            proxyState.ui.isShowIntro = false
                            playAudio()
                        }}
                    >
                        <img className="select-none absolute w-full object-contain group-hover:opacity-0" src="./images/intro/skip.png"/>
                        <img className="select-none w-full object-contain opacity-0 group-hover:opacity-100" src="./images/intro/skip_h.png"/>
                    </div>
                </div>
                </motion.div>
            }
        </AnimatePresence>

        <audio
            onLoadedData={()=>setIsLoaded(true)}
            loop
            ref={audioRef} className="pointer-events-none w-0 h-0" src="./medias/music.mp3" />
    </>
}
export default Intro