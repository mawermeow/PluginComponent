import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {AnimatePresence, motion} from "framer-motion";
import {RxCrossCircled} from "react-icons/rx";
import {useEffect, useState} from "react";
import {changeScene} from "../utils/krpano";
import delay from "../utils/delay";

const R18=()=>{
    const {krObjScene,r18} = useSnapshot(proxyState.ui)
    const {visible,alreadyOpened} = r18
    const onClose = ()=> {
        proxyState.ui.r18.visible = false
    }
    const r18PanoList = "pano199,pano194,pano651,pano200,pano650".split(',')
    const [isOver18YearsOld,setIsOver18TearsOld]=useState(true)

    useEffect(()=>{
        if(r18PanoList.includes(krObjScene)){
            proxyState.ui.r18.visible = true
        }
    },[krObjScene])

    return <AnimatePresence>{visible&&!alreadyOpened&&<motion.div
        className={`fixed inset-0 flex items-center justify-center pointer-events-auto bg-black/60`}
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
    >
        <div className={`max-w-[450px] h-max relative`}>

            <div className="select-none absolute flex h-3/12 w-full gap-14 justify-center bottom-9">
                <div className={`w-4/12 h-full cursor-pointer text-sm sm:text-base flex items-center justify-center ${isOver18YearsOld?'bg-[#a3392e] text-white':'bg-white text-black'}`}
                     onClick={()=>{
                         setIsOver18TearsOld(true)
                         proxyState.ui.r18.alreadyOpened = true
                         onClose()
                     }}
                >
                    <div>
                        <div>我已滿18歲</div>
                        <div>I am over 18.</div>
                    </div>
                </div>
                <div className={`w-4/12 h-full cursor-pointer text-sm sm:text-base flex items-center justify-center ${!isOver18YearsOld?'bg-[#a3392e] text-white':'bg-white text-black'}`}
                     onClick={async ()=>{
                         setIsOver18TearsOld(false)
                         onClose()
                         await delay(100)
                         if(krObjScene!=="pano23973"){
                             changeScene("pano23973")
                         }
                     }}
                >
                    <div>
                        <div>我未滿18歲</div>
                        <div>I am under 18.</div>
                    </div>
                </div>
            </div>
            <img className="select-none w-full object-contain" src="./images/18tip.png"/>
        </div>
    </motion.div>}</AnimatePresence>
}

export default R18