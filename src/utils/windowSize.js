import {proxy} from "valtio";

export const windowSizeState = proxy({
    currentWidth:window.innerWidth,
    currentHeight:window.innerHeight,
    get xl(){return this.currentWidth>1280},
    get lg(){return this.currentWidth>1024},
    get md(){return this.currentWidth>768},
    get sm(){return this.currentWidth>640},
    get isWidthBased(){return this.currentWidth>this.currentHeight},
})

let timeoutID = setTimeout(()=>{},1000)

const handleResize = () => {
    windowSizeState.currentWidth = window.innerWidth
    windowSizeState.currentHeight = window.innerHeight
}

const debouncedHandleResize = () => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(handleResize, 250)
}

window.addEventListener('resize', debouncedHandleResize)

