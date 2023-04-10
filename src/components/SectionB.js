import {useSnapshot} from "valtio";
import {proxyState} from "../App";
import {motion, AnimatePresence} from "framer-motion";
import {windowSizeState} from "../utils/windowSize";
import {useEffect, useRef, useState} from "react";
import {changeScene} from "../utils/krpano";
import delay from "../utils/delay";
import scrollToId from "../utils/scrollToId";


const SectionB=()=>{
    const {visible,isShowList}=useSnapshot(proxyState.ui.sectionB)
    const {sectionB}=useSnapshot(proxyState.data)
    const {currentHeight} =useSnapshot(windowSizeState)
    const contentRef= useRef()

    return <AnimatePresence>{visible&&<motion.div
        className="select-none absolute inset-0 flex flex-col items-start justify-start gap-4 sm:gap-12"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
    >
        <div className="flex relative pt-4 sm:pt-0">
            <div className="hidden sm:block w-[50px]">
                <img className="cursor-pointer pointer-events-auto select-none" src="./images/sectionB/btn_logo.png" onClick={()=>window.location.href = "../start.html"}/>
            </div>
            <div className="hidden sm:block w-[172px]">
                <img className="cursor-pointer pointer-events-auto select-none" src="./images/sectionB/btn_logo2.png" onClick={()=>window.location.href = "../start.html"}/>
            </div>
            <div className="relative sm:absolute w-9 bottom-0 left-4 sm:left-16 group pointer-events-auto cursor-pointer"
                 onClick={()=>proxyState.ui.sectionB.isShowList = !isShowList}
            >
                {!isShowList&&<>
                    <img className="select-none pointer-events-none absolute object-contain group-hover:opacity-0" src="./images/sectionB/menu.png"/>
                    <img className="select-none pointer-events-none object-contain" src="./images/sectionB/menu_h.png"/>
                </>}
                {isShowList&&<>
                    <img className="select-none pointer-events-none absolute object-contain group-hover:opacity-0" src="./images/sectionB/menu_h2.png"/>
                    <img className="select-none pointer-events-none object-contain" src="./images/sectionB/menu_h3.png"/>
                </>}
            </div>
        </div>
        <motion.div
            className={`h-full w-64 scroll-gray overflow-hidden overflow-y-scroll pointer-events-auto`}
            initial={{translateX:0}}
            // style={{height:currentHeight-310}}
            animate={isShowList?{translateX:0}:{translateX:-260}}
            transition={{duration:0.5,type:'spring'}}
        >
            <div className="w-60 mr-4">
                {sectionB.map(el=><BigItem key={`BigItem${el.title.img}`} data={el}/>)}
            </div>
        </motion.div>
        <div className="h-16 w-60 md:hidden"></div>
    </motion.div>}</AnimatePresence>
}
export default SectionB

const BigItem=({data})=>{
    const {items, title, callEventText} = data
    const {titleSelected, itemSelected} = useSnapshot(proxyState.ui.sectionB)
    const updateSelectedTitle=async (newTitle)=>{
        if(titleSelected===newTitle){
            proxyState.ui.sectionB.titleSelected = ""
        }else{
            proxyState.ui.sectionB.titleSelected = newTitle
        }
        if (callEventText) {
            await delay(100)
            proxyState.ui.eventText = callEventText
        }
    }
    const updateSelectedItem=(newItem)=>proxyState.ui.sectionB.itemSelected = newItem
    const titleIsSelected = titleSelected===title.img
    const sceneListText = items.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sceneList + ","
    }, "");

    return <div id={`sidebar_${title.img}`} className="w-60 mb-1">
        <ImgButton imgData={
            title.img==="sidebar_B0"
            ?{...title}
            :{...title,sceneList:sceneListText}
        } isSelected={titleIsSelected} onClick={updateSelectedTitle}/>
        <motion.div
            initial={{height:0}}
            animate={titleIsSelected?{height:84*items.length}:{height:0}}
            className={`overflow-hidden ${titleIsSelected?"pointer-events-auto":"pointer-events-none"}`}
        >
            {items.map(el => <ImgButton key={el.img} imgData={el} isSelected={itemSelected === el.img}
                                        onClick={updateSelectedItem}/>)}
        </motion.div>
    </div>
}

const ImgButton=({imgData, isSelected, onClick})=>{
    const {img, imgHover, imgSelect, goToScene, callEventText,title} = imgData
    const {krObjScene} = useSnapshot(proxyState.ui)
    const sceneList = imgData.sceneList?imgData.sceneList.split(','):[]
    const [isInScene,setIsInScene]=useState(false)


    useEffect(()=>{
        if(sceneList.length>0&&sceneList.includes(krObjScene)){
            setIsInScene(true)
        }else{
            setIsInScene(false)
        }
    },[krObjScene])

    return <motion.div className="relative mb-1 w-full cursor-pointer pointer-events-auto"
                       onClick={async () => {
                           onClick(img.toString())
                           scrollToId(`sidebar_${img}`)
                           if (goToScene) {
                               changeScene(goToScene)
                           }
                           if (callEventText) {
                               await delay(100)
                               proxyState.ui.eventText = callEventText
                           }
                       }}>
        <div className="relative w-full group">
            <img className={`absolute w-full object-contain ${isInScene?"opacity-100":"opacity-0"}`} src={`./images/sectionB/${imgSelect}.png`}/>
            <img className={`absolute w-full object-contain ${!isInScene&&isSelected?"opacity-100":"opacity-0"}`} src={`./images/sectionB/${imgHover}.png`}/>
            <img className={`absolute w-full object-contain ${!isInScene&&!isSelected?"opacity-100 group-hover:opacity-0":"opacity-0"}`} src={`./images/sectionB/${img}.png`}/>
            <img className={`w-full object-contain ${!isInScene&&!isSelected?"opacity-100":"opacity-0"}`} src={`./images/sectionB/${imgHover}.png`}/>
        </div>
    </motion.div>
}