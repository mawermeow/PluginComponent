import {AnimatePresence, motion} from "framer-motion";
import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {RxCrossCircled} from "react-icons/rx";
import {useEffect} from "react";

const SectionF=()=>{
    const {lang} = useSnapshot(proxyState.ui)
    const {visible,data} = useSnapshot(proxyState.ui.sectionF)
    const onClose = ()=> proxyState.ui.sectionF.visible = false

    const {title, subtitle, content} = data[lang]

    return <AnimatePresence>{visible&&<motion.div
        className="absolute inset-0 flex items-center justify-end"
        initial={{opacity:0,translateX:300}}
        animate={{opacity:1,translateX:0}}
        exit={{opacity:0,translateX:300}}
        transition={{duration:0.5}}
    >
        <div className="relative h-[50vh] w-72 sm:right-0 top-4 w-56 bg-black/70 tracking-widest overflow-hidden pointer-events-auto shadow-[10px_10px_30px_0px_rgba(0,0,0,0.3)]">
            <div className="absolute w-full">
                <div className="w-full h-10">
                    <div className="absolute w-[120px] h-10 group z-50 left-4 overflow-hidden" onClick={()=>proxyState.ui.lang = lang==='zh'?'en':'zh'}>
                        <div className={`group-hover:bg-[#8c352c] select-none peer cursor-pointer absolute h-10 w-20 font-sans group-hover:bg-[#8c352c] bg-black flex items-center justify-center`}>
                            <div className={`${lang==='zh'?'text-[#E8BB5A]':'text-white'}`}
                            >中</div>
                            <div className={`text-gray-300`}>|</div>
                            <div className={`${lang==='en'?'text-[#E8BB5A]':'text-white'}`}
                            >En</div>
                        </div>
                        <div className="absolute cursor-pointer left-20 h-10 w-10 bg-black group-hover:bg-[#8c352c] skew-y-[45deg] translate-y-5"></div>
                    </div>
                    <img className="w-full object-cover" src="./images/sectionF/titlebar.png"/>
                </div>

                <img className="w-full object-cover" src="./images/sectionF/bg.png"/>
            </div>


            <motion.div className="absolute top-1 right-1 w-6 text-white cursor-pointer pointer-events-auto z-50"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={onClose}
            >
                <RxCrossCircled/>
            </motion.div>

            <div className="w-full h-10"></div>
            <div className="w-full h-[calc(100%-64px)] overflow-y-scroll hide-scroll relative">
                <div className="px-4 z-10">
                    {/*<div className="text-[20px] text-[#a3392e] font-bold w-full text-center border border-0 border-b-[1px] border-[#E8BB5A] mb-4 pb-4">{subtitle}</div>*/}
                    <div className="text-[16px] text-[#a3392e] font-bold w-full my-4 ">
                        ●
                        <span className="mx-2">{title}</span>
                    </div>
                    <div className="mt-4 font-sans whitespace-pre-line text-[#666464] font-bold text-[14px] leading-[30px]">{subtitle}</div>
                    <div className="mt-4 font-sans whitespace-pre-line text-[#666464] text-[14px] leading-[30px]">{content}</div>
                </div>
            </div>
            <div className="w-full h-6"></div>
        </div>
    </motion.div>}</AnimatePresence>
}
export default SectionF