export const changeScene=(scene)=>{
    const krpano = document.getElementById("krpanoSWFObject")
    if(krpano){
        const krpanoObj = krpano.get("global")
        krpanoObj.call("loadscene(" + scene + ", null, MERGE, BLEND(1));")
        krpanoObj.hotspot.getArray().forEach(el=>{
            if(el.style==="Icontest"){
                krpanoObj.call("looktohotspot('"+ el.name + "',90);")
            }
        })
    }
}