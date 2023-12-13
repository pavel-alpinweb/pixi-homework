import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

const appContainer = <HTMLDivElement>document.getElementById('app');
console.log(appContainer);
const app = new PIXI.Application({
    antialias: true,
    resizeTo: appContainer,
    background: '#f5f5f5',
});
appContainer.appendChild(<HTMLCanvasElement>app.view);