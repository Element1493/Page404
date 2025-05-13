import fs from "fs";

/*
 * Конвертирует SVG в JSON (Только для human_1 и human_2)
*/
const svgToJson = ({to,form}) =>{
    if(fs.existsSync(to)){
        let svg = fs.readFileSync(to).toString();
        svg = svg.replace(/[\n\r\t]+/g, '');
        svg = JSON.stringify([...svg.matchAll(/<g id="(.*?)">(.*?)<\/g>/gis)].map((child)=>{
            const result = {};
            [...child[2].matchAll(/<(.*?)>/gis)].forEach((value) => {
                const tag = (attributes,name) =>{
                    return [...attributes.matchAll(new RegExp(name+'="(.+?)"','g'))][0][1];
                };
                if(typeof result[child[1]] === "undefined") result[child[1]] = {};
                switch(value[1].substring(0, value[1].indexOf(" "))){
					case 'ellipse':
					case 'circle':
                        if(typeof result[child[1]].cx === "undefined") result[child[1]].cx = [];
						result[child[1]].cx.push(tag(value[1],'cx'));
                        if(typeof result[child[1]].cy === "undefined") result[child[1]].cy = [];
						result[child[1]].cy.push(tag(value[1],'cy'));
					break;
					case 'path':
                        if(typeof result[child[1]].d === "undefined") result[child[1]].d = [];
						result[child[1]].d.push(tag(value[1],'d'));
					break;
				}
            });
            return result;
        }), null, 2);
        fs.writeFileSync(form,svg,'utf-8');
        console.log(`Конвертация завершена`);
    }else{
        console.error(`Файл ${to} - отсутствует`);
    }
}
svgToJson({
    to:'./human_1.svg',
    form:'./human_1.json',
});