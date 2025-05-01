const Parallax = (element:any,decay:number=0,minWidth:number|null=726) => {
    const body = document.querySelector("body");
    if(body){
        document.body.addEventListener("mousemove",(e) =>{
            const mouse = (Math.floor(e.clientX - body.getBoundingClientRect().left) / (body.getBoundingClientRect().right - body.getBoundingClientRect().left) * body.offsetWidth) - (element.offsetLeft + (element.offsetWidth / 2));
            if (minWidth && window.matchMedia(`(min-width: ${minWidth}px)`)){
                element.style.transform = `translate(${(-1 * mouse)/decay}px)`;
            }
        });
    }
};
export default Parallax;