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

export const mouseScroll=async ()=>{
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const krpano = document.getElementById("krpanoSWFObject")
    if(krpano){
        const krpanoObj = krpano.get("global")
        const fov = krpanoObj.get("view.fov");
        krpanoObj.call(`tween(view.fov, ${fov-20}, 0.8);`)
        await delay(800)
        krpanoObj.call(`tween(view.fov, ${fov}, 0.8);`)
    }


}

export const screenDrag=async ()=>{
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const krpano = document.getElementById("krpanoSWFObject")
    if(krpano){
        const krpanoObj = krpano.get("global")
        const hlookat = krpanoObj.get("view.hlookat");
        krpanoObj.call(`tween(view.hlookat,${hlookat+15}, 0.5);`)
        await delay(500)
        krpanoObj.call(`tween(view.hlookat,${hlookat-15}, 0.8);`)
        await delay(800)
        krpanoObj.call(`tween(view.hlookat,${hlookat}, 0.5);`)
    }

}