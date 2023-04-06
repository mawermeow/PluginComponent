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
        initial={{opacity:0,translateX:300}}
        animate={{opacity:1,translateX:0}}
        exit={{opacity:0,translateX:300}}
        transition={{duration:0.5}}
    >
        <div className="relative h-[65vh] w-full sm:w-[340px] right-0 top-0 tracking-widest overflow-hidden pointer-events-auto">
            <motion.div className="absolute top-2 right-1 w-6 text-white cursor-pointer z-10"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={onClose}
            >
                <RxCrossCircled/>
            </motion.div>

            <div className="relative w-full h-12 flex items-center overflow-hidden">
                <div className="absolute w-full h-full">
                    <img className="w-full object-cover" src="./images/sectionC/titlebg.png"/>
                </div>
                {/*<div className="z-10 text-white text-2xl font-bold pt-3 pl-8">{title}</div>*/}

                <div className="group z-50 relative -translate-y-6" onClick={()=>proxyState.ui.lang = lang==='zh'?'en':'zh'}>
                    <div className={`group-hover:bg-[#8c352c] select-none peer cursor-pointer absolute h-12 w-20 font-sans group-hover:bg-[#8c352c] bg-black flex items-center justify-center`}>
                        <div className={`${lang==='zh'?'text-[#E8BB5A]':'text-white'}`}
                        >中</div>
                        <div className={`text-gray-300`}>|</div>
                        <div className={`${lang==='en'?'text-[#E8BB5A]':'text-white'}`}
                        >En</div>
                    </div>
                    <div className="absolute cursor-pointer left-20 h-12 w-12 bg-black group-hover:bg-[#8c352c] -skew-y-[45deg] -translate-y-6"></div>
                </div>

                {/*正梯形中英切換*/}
                {/*<div className="group z-40" onClick={()=>proxyState.ui.lang = lang==='zh'?'en':'zh'}>*/}
                {/*    <div className="select-none absolute group-hover:bg-[#8c352c] cursor-pointer bottom-0 right-0 h-10 w-20 bg-black/75 flex items-center justify-center font-sans ">*/}
                {/*        <div className={`${lang==='zh'?'text-[#E8BB5A]':'text-white'} `}*/}
                {/*             >中</div>*/}
                {/*        <div className={`text-gray-300`}>|</div>*/}
                {/*        <div className={`${lang==='en'?'text-[#E8BB5A]':'text-white'} `}*/}
                {/*             >En</div>*/}
                {/*    </div>*/}
                {/*    <div className="select-none absolute cursor-pointer bottom-0 right-20 overflow-hidden">*/}
                {/*        <div className="h-10 w-10 bg-black/75 group-hover:bg-[#8c352c] transform -skew-y-[45deg] translate-y-5"></div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="absolute bottom-0 w-full h-4 bg-black/75"></div>*/}
            </div>


            <div className="w-full h-full bg-black/75 shadow-[inset_0_25px_60px_-15px_rgba(0,0,0,1)]">
                <div className="w-full h-[calc(100%-148px)] overflow-y-scroll hide-scroll relative">
                    <div className="z-10 text-white text-2xl font-bold pt-4 pl-8">
                        {title}
                    </div>
                    <div className="w-[calc(100%-64)] mx-8 border border-0 border-b-[1px] border-white mb-4 pb-4"></div>

                    <div className="w-full px-8 py-1 text-[#E8BB5A] font-bold text-[1.25rem]">
                        ■ {subtitle}
                    </div>
                    {img&&<div className="w-full rounded-xl">
                        <img src={`./images/${eventTitle}/${img}.png`}/>
                    </div>}

                    <div className="px-8 pt-2">
                        {bigContent&&<div
                            className="font-sans mb-2 whitespace-pre-line text-white text-[1.2rem] leading-[30px]">{bigContent}</div>}
                        <div className="font-sans whitespace-pre-line text-white text-[16px] leading-[35px]">{content}</div>
                    </div>
                </div>
                <div className="w-full h-6"></div>
            </div>



        </div>
    </motion.div>}</AnimatePresence>
}

export default SectionC