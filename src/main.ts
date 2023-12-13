import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

const SQUARE_WIDTH = 250;
const SQUARE_HEIGHT = 250;
const appContainer = <HTMLDivElement>document.getElementById('app');
console.log(appContainer);
const app = new PIXI.Application({
    antialias: true,
    resizeTo: appContainer,
    background: '#f5f5f5',
});
appContainer.appendChild(<HTMLCanvasElement>app.view);

const square = new PIXI.Graphics();
square.beginFill('#fff');
square.drawRect(
    window.innerWidth / 2 - SQUARE_WIDTH / 2,
    window.innerHeight / 2 - SQUARE_HEIGHT / 2,
    SQUARE_WIDTH,
    SQUARE_HEIGHT
);
square.endFill();

const container = new PIXI.Container();
container.addChild(square)
app.stage.addChild(container);