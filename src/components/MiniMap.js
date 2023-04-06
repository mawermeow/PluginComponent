import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {AnimatePresence, motion} from "framer-motion";
import {RxCrossCircled} from "react-icons/rx";
import {windowSizeState} from "../utils/windowSize";
import {useEffect, useRef} from "react";
import Fan from "./Fan";
import {changeScene} from "../utils/krpano";

const dotList = [
    {id:`1`,scene:`pano182`,sceneList:``,cx:`449.91`,cy:`511.35`,r:`5`},
    {id:`2`,scene:`pano183`,sceneList:``,cx:`449.91`,cy:`406.18`,r:`5`},
    {id:`3`,scene:`pano13`,sceneList:``,cx:`322.58`,cy:`406.18`,r:`5`},
    {id:`4`,scene:`pano34`,sceneList:``,cx:`385.08`,cy:`291.68`,r:`5`},
    {id:`5`,scene:`pano17`,sceneList:``,cx:`385.08`,cy:`246.68`,r:`5`},
    {id:`6`,scene:`pano16`,sceneList:`pano265,pano16`,cx:`479.08`,cy:`258.18`,r:`5`},
    {id:`7`,scene:`pano301`,sceneList:`pano12,pano301`,cx:`441.08`,cy:`192.68`,r:`5`},
    {id:`8`,scene:`pano14`,sceneList:``,cx:`445.58`,cy:`326.68`,r:`5`},
    {id:`9`,scene:`pano15`,sceneList:``,cx:`330.08`,cy:`326.68`,r:`5`},
    {id:`10`,scene:`pano44`,sceneList:``,cx:`290.58`,cy:`287.68`,r:`5`},
    {id:`11`,scene:`pano19`,sceneList:``,cx:`479.58`,cy:`142.68`,r:`5`},
    {id:`12`,scene:`pano43`,sceneList:``,cx:`528.91`,cy:`109.68`,r:`5`},
    {id:`13`,scene:`pano113`,sceneList:``,cx:`339.58`,cy:`126.68`,r:`5`},
    {id:`14`,scene:`pano130`,sceneList:`pano4904,pano130`,cx:`278.58`,cy:`164.68`,r:`5`},
    {id:`15`,scene:`pano131`,sceneList:``,cx:`226.58`,cy:`126.68`,r:`5`},
    {id:`16`,scene:`pano132`,sceneList:``,cx:`281.08`,cy:`94.18`,r:`5`},
    {id:`17`,scene:`pano11`,sceneList:``,cx:`247.08`,cy:`200.18`,r:`5`},
    {id:`18`,scene:`pano45`,sceneList:`pano45,pano281`,cx:`224.58`,cy:`266.18`,r:`5`},
    {id:`19`,scene:`pano193`,sceneList:``,cx:`204.58`,cy:`239.68`,r:`5`},
    {id:`20`,scene:`pano192`,sceneList:``,cx:`120.08`,cy:`239.68`,r:`5`},
    {id:`21`,scene:`pano188`,sceneList:``,cx:`83.08`,cy:`232.18`,r:`5`},
    {id:`22`,scene:`pano189`,sceneList:``,cx:`83.08`,cy:`192.68`,r:`5`},
    {id:`23`,scene:`pano187`,sceneList:``,cx:`83.08`,cy:`138.68`,r:`5`},
    {id:`24`,scene:`pano190`,sceneList:``,cx:`115.58`,cy:`134.18`,r:`5`},
    {id:`25`,scene:`pano191`,sceneList:``,cx:`176.58`,cy:`142.18`,r:`5`},
    {id:`26`,scene:`pano648`,sceneList:``,cx:`145.08`,cy:`193.68`,r:`5`},
    {id:`27`,scene:`pano194`,sceneList:``,cx:`180.08`,cy:`306.35`,r:`5`},
    {id:`28`,scene:`pano199`,sceneList:``,cx:`180.08`,cy:`373.68`,r:`5`},
    {id:`29`,scene:`pano651`,sceneList:``,cx:`230.41`,cy:`424.01`,r:`5`},
    {id:`30`,scene:`pano200`,sceneList:``,cx:`179.67`,cy:`428.01`,r:`5`},
    {id:`31`,scene:`pano650`,sceneList:``,cx:`133`,cy:`424.01`,r:`5`},
    {id:`32`,scene:`pano140`,sceneList:``,cx:`633.67`,cy:`341.35`,r:`5`},
    {id:`33`,scene:`pano197`,sceneList:``,cx:`718.34`,cy:`385.35`,r:`5`},
    {id:`34`,scene:`pano198`,sceneList:``,cx:`633.67`,cy:`420.68`,r:`5`},
    {id:`35`,scene:`pano142`,sceneList:``,cx:`566.58`,cy:`420.68`,r:`5`},
    {id:`36`,scene:`pano141`,sceneList:``,cx:`566.58`,cy:`374.68`,r:`5`},
    {id:`37`,scene:`pano10`,sceneList:`pano4461,pano10`,cx:`566.58`,cy:`260.01`,r:`5`},
    {id:`38`,scene:`pano133`,sceneList:``,cx:`577.25`,cy:`218.68`,r:`5`},
    {id:`39`,scene:`pano136`,sceneList:``,cx:`620.58`,cy:`254.68`,r:`5`},
    {id:`40`,scene:`pano135`,sceneList:``,cx:`669.91`,cy:`254.68`,r:`5`},
    {id:`41`,scene:`pano137`,sceneList:``,cx:`716.58`,cy:`269.35`,r:`5`},
    {id:`42`,scene:`pano277`,sceneList:``,cx:`716.58`,cy:`222.68`,r:`5`},
    {id:`43`,scene:`pano134`,sceneList:``,cx:`663.91`,cy:`216.68`,r:`5`},
    {id:`44`,scene:`pano139`,sceneList:``,cx:`606.58`,cy:`165.35`,r:`5`},
    {id:`45`,scene:`pano138`,sceneList:``,cx:`664.58`,cy:`165.35`,r:`5`},
    {id:`46`,scene:`pano196`,sceneList:``,cx:`714.58`,cy:`139.35`,r:`5`},
    {id:`47`,scene:`pano195`,sceneList:``,cx:`714.58`,cy:`112.01`,r:`5`},
    {id:`48`,scene:`pano186`,sceneList:``,cx:`659.91`,cy:`96.68`,r:`5`},
    {id:`49`,scene:`pano185`,sceneList:``,cx:`610.91`,cy:`96.68`,r:`5`},
    {id:`50`,scene:`pano184`,sceneList:``,cx:`567.58`,cy:`96.68`,r:`5`},
]

const MiniMap=({eventTitle})=>{
    const {visible,fovX,fovY} = useSnapshot(proxyState.ui[eventTitle])
    const onClose = ()=> proxyState.ui[eventTitle].visible = false
    const {krObjScene, krObjFov,miniMap,krObjLookAt}=useSnapshot(proxyState.ui)
    const fanOffset = miniMap.dotWidth/2
    const {currentWidth,md,currentHeight}=useSnapshot(windowSizeState)
    const mapRef=useRef()

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
    const {currentWidth}=useSnapshot(windowSizeState)

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
                onClick={()=>{changeScene(el.scene)}} cx={el.cx} cy={el.cy} r={el.r}/>
    </>
}