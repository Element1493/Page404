import Playlist from "../data/playlist";
import Svg from "./svg";

class Audio{
    id: string;
    element: any;
    path: string;
    content: HTMLDivElement;
    audio: HTMLAudioElement;
    info: HTMLDivElement;
    controls: HTMLDivElement;
    track: (index?: number) => void;
    button: (type: string) => void;
    progressbar: HTMLDivElement;
    constructor(element:any,path:string='./music/') {
        this.id         = element.id;
        this.element    = element;
        this.path       = path;

    //Создает элемент плеер:
        this.content = document.createElement("div");
        this.content.classList.add(`${this.id}-audio`);
        this.content.setAttribute('data-index','0');
        this.content.setAttribute('data-play','false');
        this.element.append(this.content);

    //Создает элемент audio:
        this.audio = document.createElement("audio");
        this.audio.style.display = "none";
        this.audio.src = `${this.path}${Playlist[0].file}`;
        this.audio.controls = true;
        this.content.append(this.audio);

    //Создает элемент информационный блок:
        this.info = document.createElement("div");
        this.info.classList.add(`${this.id}-audio-info`);
        this.info.title = `${Playlist[0].artist} - ${Playlist[0].track}`;
        this.info.textContent = Playlist[0].track;
        this.content.append(this.info);
    
    //Создает элемент контрольной панели:
        this.controls = document.createElement("div");
        this.controls.classList.add(`${this.id}-audio-controls`);
        this.content.append(this.controls);

    //Создает элемент прогресс-бар:
        this.progressbar = document.createElement("div");
        this.progressbar.classList.add(`${this.id}-progressbar`);
        this.element.append(this.progressbar);
        const progressbar = this.progressbar;

    //Запускает трек:
        this.track = (index:number = 0) => {
            const audio = this.audio;
            const content = this.content;
            content.setAttribute('data-index',String(index));
            content.setAttribute('data-play','true');

            audio.src = `./music/${Playlist[index].file}`;
            audio.currentTime = 0;
            audio.play();
    
            this.info.setAttribute('title',`${Playlist[index].artist} - ${Playlist[index].track}`);
            this.info.textContent = Playlist[index].track;

            audio.addEventListener('ended', () => {
                content.setAttribute('data-play','true');
                if (index < Playlist.length-1) {
                    index++;
                    content.setAttribute('data-index',String(index));
                    this.track(index);
                }else{
                    content.setAttribute('data-index','0');
                    this.track(0);
                }
            }, false);
            audio.addEventListener("timeupdate", () => {
                progressbar.style.setProperty("--value", (audio.currentTime +.25)/audio.duration*100+'%');
            });
        };
    //Создает элемент кнопку:
        this.button = (type:string) => {
            const button = document.createElement("button");
            button.classList.add(`${this.id}-audio-control`,type);
            button.setAttribute('type','button');
            button.onclick = () =>{
                switch(type) {
                    case 'prev':
                        this.prev();
                    break;
                    case 'switch':
                        this.toggle();
                    break;
                    case 'next':
                        this.next();
                    break;
                }
            }
            switch(type) {
                case 'prev': 
                    button.append(Svg.create({
                        viewBox:'0 0 10 7.5',
                        tags:[{
                            tag:'path',
                            attributes:[{
                                name:'fill',
                                value:'currentcolor',
                            },{
                                name:'d',
                                value:'M5 0 0 3.8l5 3.8V0zm0 3.8 5 3.8V0L5 3.8z'
                            }]
                        }]
                    }));
                break;
                case 'switch':
                    button.append(Svg.create({
                        viewBox:'0 0 10 7.5',
                        tags:[{
                            name:'pause',
                            tag:'path',
                            attributes:[{
                                name:'fill',
                                value:'currentcolor',
                            },{
                                name:'d',
                                value:'M1.2 0v7.5h2.5V0H1.2zm5 0v7.5h2.5V0H6.2z'
                            }]
                        },{
                            name:'play',
                            tag:'path',
                            attributes:[{
                                name:'fill',
                                value:'currentcolor',
                            },{
                                name:'d',
                                value:'M1.2 0v7.5l7.5-3.8L1.2 0z'
                            }]
                        }]
                    }));
                break;
                case 'next':
                    button.append(Svg.create({
                        viewBox:'0 0 10 7.5',
                        tags:[{
                            tag:'path',
                            attributes:[{
                                name:'fill',
                                value:'currentcolor',
                            },{
                                name:'d',
                                value:'M0 0v7.5l5-3.8L0 0zm5 3.8v3.8l5-3.8L5 0v3.8z'
                            }]
                        }]
                    }));
                break;
            }
            this.controls.append(button);
        }

        this.button('prev');
        this.button('switch');
        this.button('next');
    }
//События на переключение предыдущего трека:
    prev(index: number = Number(this.content.getAttribute('data-index'))){
        this.content.setAttribute('data-play','true');
        if(index > 0) {
            index--;
            this.content.setAttribute('data-index',String(index));
            this.track(index);
        } else {
            this.content.setAttribute('data-index',String(Playlist.length-1));
            this.track(Playlist.length-1);
        }
    }
//Событие на переключение трека:
    toggle(){
        if(this.audio.paused == false) this.pause(); else this.play();
    }
//Событие на запуск трека:
    play(index: number = Number(this.content.getAttribute('data-index'))){
        if(this.audio.paused == true) this.track(index);
    }
//Событие на остановку трека:
    pause(index: number = Number(this.content.getAttribute('data-index'))){
        if(this.audio.paused == false){
            const timerId = setInterval(()=>{
                const time = Math.round(this.audio.currentTime);
                const length = Math.round(this.audio.duration)
                if (time == length && index < 3) {
                    index++;
                    this.content.setAttribute('data-index',String(index));
                    this.track(index);
                } else if (time == length && index >= 3) {
                    this.content.setAttribute('data-index','0');
                    this.track(0);
                }
            }, 10);
            this.audio.pause();
            clearInterval(timerId);
            this.content.setAttribute('data-ыplay','false');
        }
    }
//События на переключение следующего трека:
    next(index: number = Number(this.content.getAttribute('data-index'))){
        this.content.setAttribute('data-play','true');
        if (index < Playlist.length-1) {
            index++;
            this.content.setAttribute('data-index',String(index));
            this.track(index);
        }else{
            this.content.setAttribute('data-index','0');
            this.track(0);
        }
    }
};
export default Audio;