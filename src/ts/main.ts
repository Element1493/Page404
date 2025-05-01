import '../scss/style.scss';

import Svg from "./utils/svg";
import Audio from "./utils/audio";
import Parallax from "./utils/parallax";

import Svg_1 from "./data/svg_1";
import Svg_2 from "./data/svg_2";
import Svg_3 from "./data/svg_3";
import Svg_4 from "./data/svg_4";
import Svg_5 from "./data/svg_5";

export const init = ({id,title,description,postscript}:any) => {
    const element = document.getElementById(id);
    if(element){
        const audio = new Audio(element);

    //Дорожный знак:
        const roadSignSvg = Svg.svgToDataUri(Svg.create(Svg_1));

    //Создает центральный элемент страницы:
        const centerElement = document.createElement("div");
        centerElement.classList.add(`${element.id}-center`);
        element.append(centerElement);

    //Создает элемент дорожного знака для фона:
        const imgElement1 = document.createElement("div");
        imgElement1.classList.add(`${element.id}-background-1`);
        imgElement1.style.backgroundImage = roadSignSvg;
        Parallax(imgElement1,5);
        centerElement.append(imgElement1);

    //Создает элемент городов для фона:
        const cityElements = document.createElement("div");
        cityElements.classList.add(`${element.id}-cities`);
        centerElement.append(cityElements);
        [{
            viewBox:'0 0 1420 460',
            fill:'#c5d2dd',
            path:'M1419 381V114.5l-30.3-16.7V51.2h-81.8V1h-105.2v127.2h-24.5v29.7h-19.1v71.2h-22.3v-98h-55.3v-28.6h-31.3v45.8l-29.2 16v92.2h-69.1V54.1h-74.4V92H818l-15.9 8.7v21h-73.3l-13.8 7.6v71.2h-30.9V90.8h-57.3v19.3h-90.9v46.3l-16.5 9.1V211H492V98.6l-37.2-8.1V60.1h-99.9v128.4H339V25.7l-21.3.6L255 43.8v159.8h-26.5V98l-16-21v-8.1h-37.2V77h-20.1l-16 18.7h-14.9V17.6H86.1v28.2H31.3L0 63l.4 318.9z',
            decay:300
        },{
            viewBox:'0 0 1080 410',
            fill:'#afbecb',
            path:'M1080 410V72.5h-63.2l-15.1 16.6v50.7h-16.1V.8h-71.7v323.8l-21.6-23.7V114.4H732.7v47.5h-84.4v214.5h-74.1V182.7h-21.4v-75.3h-43.9v124.8h-20.4v23.5L462.8 211h-45V49.7H331l-7.5 8.2v104.8h-24.6V15.5H225v24.7l-14.5 15.9V307h-16.6V105.6h-9.6V86.2H99.1l-14.5 15.9v22.3H0V410z',
            decay:250
        },{
            viewBox:'0 0 1185 520',
            fill:'#a9b3bb',
            path:'M1185 520V90.5h-70.4v201.2h-26v-80.1l-36.8-31.2V59.3h-46.5l-27.1-23h-34.6v122.1h-83.3V297h-21.7V103.3L778 130v115.6h-16.2V67.5h-20.6V15.2H736V3.3h-46v10.1h-28.8v40.4h-47.7l-11.9 13.7v165.2h-40.5v-33.5l-25.5-21.5V98.8h-88.7v65.1h-32.5V219l-38.9 36.7h-24.9V81.3l-69.3-40.4v161.6h-16.2V91.4h-82.2V130H145v184.4h-16.2v-79.8H73.6v-24.8l-9.8-11.9H0V520z',
            decay:200
        }].map(({viewBox,fill,path,decay}:any,index:any)=>{
            const cityElement = document.createElement("div");
            cityElement.classList.add(`${element.id}-city-${index+1}`);
            cityElement.style.backgroundImage = Svg.svgToDataUri(Svg.create({
                viewBox:viewBox,
                tags:[{
                    tag:'path',
                    attributes:[{
                        name:'fill',
                        value:fill,
                    },{
                        name:'d',
                        value:path
                    }]
                }]
            }));
            Parallax(cityElement,decay);
            cityElements.append(cityElement);
        });
    
    //Создает элемент контейнера для центрального элемента:
        const containerElement = document.createElement("div");
        containerElement.classList.add(`${element.id}-container`);
        centerElement.append(containerElement); 
        
    //Создает верхнюю часть контейнера:
        const topElement = document.createElement("div");
        topElement.classList.add(`${element.id}-top`);
        containerElement.append(topElement);

    //Создает элемент дорожный знак 1 для верхней части:
        const roadSignElement1 = document.createElement("div");
        roadSignElement1.classList.add(`${element.id}-roadSign-1`);
        roadSignElement1.style.backgroundImage = roadSignSvg;
        Parallax(roadSignElement1,150);
        topElement.append(roadSignElement1);

    //Создает элемент дорожный знак 2 для верхней части:
        const roadSignElement2 = document.createElement("div");
        roadSignElement2.classList.add(`${element.id}-roadSign-2`);
        roadSignElement2.append(Svg.create(Svg_2));
        Parallax(roadSignElement2,50);
        topElement.append(roadSignElement2);

    //Создает элементы дорожного знака для фона верхней части:
        const imgElement2 = document.createElement("div");
        imgElement2.classList.add(`${element.id}-background-2`);
        imgElement2.append(Svg.create(Svg_3));
        roadSignElement2.append(imgElement2);

    //Создает элемент дорожный знак 3 для верхней части:
        const roadSignElement3 = document.createElement("div");
        roadSignElement3.classList.add(`${element.id}-roadSign-3`);
        roadSignElement3.append(Svg.create(Svg_4));
        topElement.append(roadSignElement3);

    //Создает элементы дорожного знака для фона верхней части:
        const imgElement3 = document.createElement("div");
        imgElement3.classList.add(`${element.id}-background-3`);
        imgElement3.append(Svg.create(Svg_5));
        roadSignElement3.append(imgElement3);

    //Создает нижнюю часть контейнера:
        const bottomElement = document.createElement("div");
        bottomElement.classList.add(`${element.id}-bottom`);
        containerElement.append(bottomElement);

    //Создает заголовок для нижней части:
        const titleElement:HTMLElement = document.createElement("h1");
        titleElement.innerHTML = title;
        bottomElement.append(titleElement);

    //Создает описание для нижней части:
        const descriptionElement:HTMLElement = document.createElement("div");
        descriptionElement.classList.add(`${element.id}-description`);
        descriptionElement.innerHTML = description.replace(new RegExp('\\[play]?(.*?)\\[/play]','g'),'<span class="link" data-audio="play">$1</span>');
        bottomElement.append(descriptionElement);
    
    //Создает постскриптум для нижней части:
        const postscriptElement:HTMLElement = document.createElement("div");
        postscriptElement.classList.add(`${element.id}-postscript`);
        postscriptElement.innerHTML = postscript;
        bottomElement.append(postscriptElement);

    //Событие на запуск музыки при клике по элементу:
        const playSelector = document.querySelectorAll('[data-audio]');
    	if(playSelector.length){
    		for (let i = 0; i < playSelector.length; i++){
    			playSelector[i].addEventListener('click',()=>{
                    switch(playSelector[i].getAttribute('data-audio')){
                        case 'toggle':
                            audio.toggle();
                        break;
                        case 'play':
                            audio.play();
                        break;
                        case 'pause':
                            audio.pause();
                        break;
                    }
                });
    		}
    	}
    }
};