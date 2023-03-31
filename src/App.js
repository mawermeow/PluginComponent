import {proxy, useSnapshot,subscribe} from "valtio";
import SectionE from "./components/SectionE";
import SectionC from "./components/SectionC";
import SectionB from "./components/SectionB";
import delay from "./utils/delay";
import {windowSizeState} from "./utils/windowSize";
import {motion} from "framer-motion";

import MiniMap from "./components/MiniMap";
import IframePage from "./components/IframePage";
import SectionF from "./components/SectionF";

export const proxyState = proxy(window.frontEnd.preState?window.frontEnd.preState:{})

window.frontEnd = {
    ...window.frontEnd,
    state: proxyState,
    subscribe: (callback) => subscribe(proxyState, callback),
};

subscribe(proxyState.ui, ()=>{
    const { data } = proxyState
    const {eventText} = proxyState.ui
    const {sm} = windowSizeState
    const mutexList = [ "sectionC", "sectionD", "sectionE", "sectionF", "miniMap" ]
    const mutexClose = (eventTitle)=>{
        if(mutexList.includes(eventTitle)){
            mutexList.filter(el=>el!==eventTitle).forEach(el=>{
                proxyState.ui[el].visible = false
            })
            if(!sm){
                proxyState.ui.sectionB.isShowList = false
            }
        }
    }

    const eventTextList = eventText.split(';')
    if(eventTextList.length>0){
        eventTextList.forEach(async(el)=>{
            const eventTitle = el.split(':')[0]
            const eventId = el.split(':')[1]

            if(eventId==='hide'){
                proxyState.ui[eventTitle].visible = false
                proxyState.ui.eventText = ""
            } else if(eventId==='show'){
                proxyState.ui[eventTitle].visible = true
                proxyState.ui.eventText = ""
                mutexClose(eventTitle)
            } else if(eventId==='toggle'){
                proxyState.ui[eventTitle].visible = !proxyState.ui[eventTitle].visible
                proxyState.ui.eventText = ""
            } else if(eventId==='hideMenu'){ // sectionB 的 event 只有這個
                proxyState.ui.sectionB.isShowList = false
                proxyState.ui.eventText = ""
            } else if(eventTitle!==''){ // C D E iframe
                proxyState.ui[eventTitle].data = data[eventTitle][eventId]
                proxyState.ui[eventTitle].visible = true
                proxyState.ui.eventText = ""
                mutexClose(eventTitle)
            }
            await delay(100)
        })
    }

    const {krObjScene, frontEndRecordScene, krObjLookAt} = proxyState.ui
    if(krObjScene!==frontEndRecordScene){
        proxyState.ui.sectionC.visible = false
        proxyState.ui.sectionD.visible = false
        proxyState.ui.sectionE.visible = false
        proxyState.ui.sectionB.itemSelected = ""

        proxyState.ui.frontEndRecordScene = krObjScene
    }

    // const scenes = Object.values(data.sectionF).map(el => el.data.zh.scene)


})

function App() {

    const{krObjLookAt}=useSnapshot(proxyState.ui)

    return (
        <div className="inset-0 fixed pointer-events-none">
            <SectionB/>
            <SectionC eventTitle="sectionC"/>
            <SectionC eventTitle="sectionD"/>
            <SectionE eventTitle="sectionE"/>
            <SectionF/>

            <MiniMap eventTitle="miniMap"/>
            <IframePage/>

        </div>
    );
}

export default App;
