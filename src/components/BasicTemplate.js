import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {AnimatePresence, motion} from "framer-motion";
import {RxCrossCircled} from "react-icons/rx";

const BasicTemplate=({eventTitle})=>{
    const {lang} = useSnapshot(proxyState.ui)
    const {visible,data} = useSnapshot(proxyState.ui[eventTitle])
    const onClose = ()=> proxyState.ui[eventTitle].visible = false

    const {img} = data
    const {subtitle, content} = data[lang]

    return <AnimatePresence>{visible&&<motion.div
        className="absolute inset-0 flex items-center justify-center sm:justify-end"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
    >
        <div className="relative h-[50vh] w-72 right-4 top-4 w-56 bg-black/70 tracking-widest overflow-hidden pointer-events-auto">
            <div className="absolute h-10 w-20 bg-black flex items-center justify-center">
                <div className={`${lang==='zh'?'text-[#E8BB5A]':'text-white'} cursor-pointer`}
                     onClick={()=>proxyState.ui.lang = "zh"}>中</div>
                <div className={`text-gray-300`}>|</div>
                <div className={`${lang==='en'?'text-[#E8BB5A]':'text-white'} cursor-pointer`}
                     onClick={()=>proxyState.ui.lang = "en"}>En</div>
            </div>
            <div className="absolute left-20 h-10 w-10 bg-black transform -skew-y-[45deg] -translate-y-5"></div>
            <motion.div className="absolute top-1 right-1 w-6 text-white cursor-pointer z-10"
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        onClick={onClose}
            >
                <RxCrossCircled/>
            </motion.div>

            <div className="w-full h-full overflow-y-scroll">
                <div className="p-4">
                    <div className="text-[20px] text-[#E8BB5A] font-bold w-full text-center border border-0 border-b-[1px] border-[#E8BB5A] my-4 py-4">{subtitle}</div>

                    <div className="w-full">
                        <img className="w-full" src={`./images/E_web/${img}.png`}/>
                    </div>

                    <div className="whitespace-pre-line text-white text-[16px] leading-[30px]">{content}</div>
                </div>
            </div>


        </div>
    </motion.div>}</AnimatePresence>
}

export default BasicTemplate