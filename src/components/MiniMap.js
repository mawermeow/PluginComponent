import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {AnimatePresence, motion} from "framer-motion";
import {RxCrossCircled} from "react-icons/rx";
import {windowSizeState} from "../utils/windowSize";
import {useEffect, useRef} from "react";
import Fan from "./Fan";
import {changeScene} from "../utils/krpano";

const MiniMap=({eventTitle})=>{
    const {visible,fovX,fovY} = useSnapshot(proxyState.ui[eventTitle])
    const onClose = ()=> proxyState.ui[eventTitle].visible = false
    const {krObjScene, krObjFov,miniMap,krObjLookAt}=useSnapshot(proxyState.ui)
    const fanOffset = miniMap.dotWidth/2
    const {currentWidth,md,currentHeight}=useSnapshot(windowSizeState)
    const mapRef=useRef()
    const dotList = proxyState.data.miniMap

    useEffect(()=>{
        if(!md){
            proxyState.ui.miniMap.visible = false
        }
    },[currentWidth])

    return <>
        <motion.div
            className={`bg-black/60 fixed inset-0 transition-opacity ${visible&&!md?"opacity-100 pointer-events-auto":"pointer-events-none opacity-0"}`}
            onClick={onClose}
        >
        </motion.div>
        <AnimatePresence>{visible&&<motion.div
            className="fixed inset-0 flex items-center justify-start md:justify-center"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            drag={700 > currentWidth ? "x" : false}
            dragConstraints={{
                left:currentWidth-700-32,
                right:0,
            }}
        >
        <div className={`absolute p-4 bg-black/75 rounded-xl`}>
            <div className="md:hidden absolute top-4 left-10 pointer-events-none"><img src="./images/map_tip.png"/></div>
            {md&&<motion.div className="absolute top-2 right-1 w-6 text-white cursor-pointer z-10 pointer-events-auto"
                             whileHover={{scale:1.1}}
                             whileTap={{scale:0.9}}
                             onClick={onClose}
>
                <RxCrossCircled/>
            </motion.div>}

            <div
                className="min-w-[700px] md:min-w-[560px] w-[80vw] max-w-[1000px] pointer-events-auto relative"
                // dragConstraints
                ref={mapRef}
            >
                <img className="select-none absolute w-full object-contain" src="./images/map.png"/>
                <div className="relative">
                    <div className="fixed inset-0 pointer-events-none">
                        {(miniMap.fovX+miniMap.fovY)>0&&<motion.div
                            className="origin-top-left absolute w-10 h-10"
                            style={{
                                x:miniMap.fovX+fanOffset,
                                y:miniMap.fovY+fanOffset,
                                rotateZ:krObjLookAt%360-138,
                                opacity:0.6
                            }}>
                            <Fan cx={0} cy={0} angle={krObjFov}/>
                        </motion.div>}
                    </div>
                    <svg className="pointer-events-auto" viewBox="0 0 812.28 528.01">
                        {dotList.map(el=><Dot key={`dot_${el.cx}_${el.cy}`} el={el}/>)}
                    </svg>
                </div>
            </div>
        </div>
    </motion.div>}</AnimatePresence>
    </>
}

export default MiniMap

const Dot=({el})=>{
    const {krObjScene, krObjFov}=useSnapshot(proxyState.ui)
    const isActive = [el.scene,...el.sceneList.split(',')].includes(krObjScene)
    const ref = useRef()
    const {currentWidth,md}=useSnapshot(windowSizeState)

    useEffect(() => {
        if (isActive&&ref.current) {
            const rect = ref.current.getBoundingClientRect();
            proxyState.ui.miniMap.fovX = rect.x
            proxyState.ui.miniMap.fovY = rect.y
            proxyState.ui.miniMap.dotWidth = rect.width
        }
    }, [krObjScene,currentWidth]);

    return <>
        <motion.circle
            className="cursor-pointer"
            whileHover={{scale:1.2}}
            stroke="white" strokeWidth={isActive?"1":"0"}
                fill={isActive?"#a3392e":"#e8bb5a"} ref={ref}
                onClick={()=>{
                    changeScene(el.scene)
                    if(!md){proxyState.ui.miniMap.visible = false}
                }} cx={el.cx} cy={el.cy} r={el.r}/>
    </>
}