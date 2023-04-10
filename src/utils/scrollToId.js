const scrollToId=(id)=>{
    const targetElement = document.getElementById(id)
    if(targetElement){
        targetElement.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
}
export default scrollToId