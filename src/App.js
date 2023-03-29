import {proxy, useSnapshot,subscribe} from "valtio";
import SectionE from "./components/SectionE";
import SectionC from "./components/SectionC";
import SectionB from "./components/SectionB";
import delay from "./utils/delay";
import {windowSizeState} from "./utils/windowSize";

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
    const mutexList = [ "sectionC", "sectionD", "sectionE" ]

    const eventTextList = eventText.split(';')
    if(eventTextList.length>0){
        eventTextList.forEach(async(el)=>{
            const eventTitle = el.split(':')[0]
            const eventId = el.split(':')[1]

            if(eventId==='hide'){
                proxyState.ui[eventTitle].visible = false
                proxyState.ui.eventText = ""
            }else if(eventId==='hideMenu'){
                proxyState.ui.sectionB.isShowList = false
                proxyState.ui.eventText = ""
            } else if(eventTitle!==''){
                proxyState.ui[eventTitle].data = data[eventTitle][eventId]
                proxyState.ui[eventTitle].visible = true
                proxyState.ui.eventText = ""

                if(mutexList.includes(eventTitle)){
                    mutexList.filter(el=>el!==eventTitle).forEach(el=>{
                        proxyState.ui[el].visible = false
                    })
                    if(!sm){
                        proxyState.ui.sectionB.isShowList = false
                    }
                }
            }
            await delay(100)
        })
    }

    const {krObjScene, frontEndRecordScene} = proxyState.ui
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
    return (
        <div className="inset-0 fixed pointer-events-none">
            <SectionB/>
            <SectionC eventTitle="sectionC"/>
            <SectionC eventTitle="sectionD"/>
            <SectionE eventTitle="sectionE"/>
        </div>
    );
}

export default App;
