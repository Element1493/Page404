const Svg = {
    xmlns:'http://www.w3.org/2000/svg',
    create: ({viewBox,tags,name}:any) => {
        const svgElement = document.createElementNS(Svg.xmlns, "svg");
        svgElement.setAttribute("xmlns", Svg.xmlns);
        svgElement.setAttribute('viewBox', viewBox);
        if(name) svgElement.classList.add(name);
        if(tags && tags.length) tags.map(({name,tag,attributes,stops}:any)=>{
            const loop = (element:any,attribute:string,value:any,index:number=0,time:number=34) => {
                if (index < value.length-1) setTimeout(()=>{
                    element.setAttribute(attribute, value[index]);
                    loop(element,attribute,value,(index+1),time);
                },time); else loop(element,attribute,value,0,time);
            }
            const element = document.createElementNS(Svg.xmlns,tag);
            if(element){
                svgElement.append(element);
                if(name) element.classList.add(name);
                if(attributes && attributes.length) attributes.map(({name,value,animation}:any) => {
                    if(typeof animation !== "undefined"){
                        element.setAttribute(name,value[0]);
                        loop(element,name,value,0,Number(animation.time));
                    }else{
                        element.setAttribute(name,value);
                    }
                });
                switch (tag){
                    case 'radialGradient':
                    case 'linearGradient':
                        if(stops && stops.length) stops.map(({offset,style}:any) => {
                            const stop = document.createElementNS(Svg.xmlns,'stop');
                            stop.setAttribute('offset',offset);
                            stop.setAttribute('style',style);
                            element.append(stop);
                        });
                    break;
                }
            }
        });
        return svgElement;
    },
    svgToDataUri: (svg:any) => {
        const xml = new XMLSerializer().serializeToString(svg);
        return `url(data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)})`;
    }
};

export default Svg;