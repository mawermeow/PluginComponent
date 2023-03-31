import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {AnimatePresence, motion} from "framer-motion";
import {RxCrossCircled} from "react-icons/rx";

const IframePage=()=>{
    const {visible,data} = useSnapshot(proxyState.ui.iframe)
    const onClose = ()=> proxyState.ui.iframe.visible = false

    return <AnimatePresence>{visible&&<motion.div
        className="fixed inset-0 flex items-center justify-center z-[60]"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
    >
        <div className="bg-black/75 absolute inset-0"></div>
        <motion.div className="fixed top-1 right-1 w-6 text-white cursor-pointer z-[70] pointer-events-auto"
                    whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    onClick={onClose}
        >
            <RxCrossCircled/>
        </motion.div>

        <div className={`${data.isFullScreen?"w-full":"w-full md:w-[80vw] max-w-[1000px]"} h-full relative overflow-hidden pointer-events-auto`}>
            <iframe src={data.url} className="w-full h-full" frameBorder="0"></iframe>
        </div>
    </motion.div>}</AnimatePresence>
}

export default IframePage