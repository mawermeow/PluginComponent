import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {AnimatePresence, motion} from "framer-motion";
import {RxCrossCircled} from "react-icons/rx";

const SectionC=({eventTitle})=>{
    const {lang} = useSnapshot(proxyState.ui)
    const {visible,data} = useSnapshot(proxyState.ui[eventTitle])
    const onClose = ()=> proxyState.ui[eventTitle].visible = false

    const {title, subtitle, img, content, bigContent} = data[lang]

    return <AnimatePresence>{visible&&<motion.div
        className="absolute inset-0 flex items-center justify-center sm:justify-end"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
    >
        <div className="relative h-full w-full sm:w-[340px] right-0 top-0 tracking-widest overflow-hidden pointer-events-auto">


            <motion.div className="absolute top-2 right-1 w-6 text-white cursor-pointer z-10"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={onClose}
            >
                <RxCrossCircled/>
            </motion.div>

            <div className="relative w-full py-6 flex items-center overflow-hidden">
                <div className="absolute w-full h-full">
                    <img className="w-full h-full" src="./images/sectionC/titlebg.png"/>
                </div>
                <div className="z-10 text-white text-2xl font-bold pt-3 pl-8">{title}</div>

                <div className="group z-50" onClick={()=>proxyState.ui.lang = lang==='zh'?'en':'zh'}>
                    <div className="select-none absolute group-hover:bg-[#8c352c] cursor-pointer bottom-0 right-0 h-10 w-20 bg-black/75 flex items-center justify-center font-sans ">
                        <div className={`${lang==='zh'?'text-[#E8BB5A]':'text-white'} `}
                             >中</div>
                        <div className={`text-gray-300`}>|</div>
                        <div className={`${lang==='en'?'text-[#E8BB5A]':'text-white'} `}
                             >En</div>
                    </div>
                    <div className="select-none absolute cursor-pointer bottom-0 right-20 overflow-hidden">
                        <div className="h-10 w-10 bg-black/75 group-hover:bg-[#8c352c] transform -skew-y-[45deg] translate-y-5"></div>
                    </div>
                </div>

                {/*<div className="absolute bottom-0 w-full h-4 bg-black/75"></div>*/}
            </div>

            <div className="w-full h-full overflow-y-scroll hide-scroll bg-black/75 shadow-[inset_0_25px_60px_-15px_rgba(0,0,0,1)]">
                <div className="w-full px-8 py-2 text-[#E8BB5A] font-bold bg-black text-[1.25rem]">
                    ■ {subtitle}
                </div>
                {img&&<div className="w-full rounded-xl">
                    <img src={`./images/${eventTitle}/${img}.png`}/>
                </div>}

                <div className="px-8 py-4 ">
                    {bigContent&&<div
                        className="font-sans mb-2 whitespace-pre-line text-white text-[1.2rem] leading-[30px]">{bigContent}</div>}
                    <div className="font-sans whitespace-pre-line text-white text-[16px] leading-[35px]">{content}</div>
                </div>
            </div>


        </div>
    </motion.div>}</AnimatePresence>
}

export default SectionC