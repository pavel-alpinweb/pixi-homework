import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

const SQUARE_WIDTH = 250;
const SQUARE_HEIGHT = 250;
const appContainer = <HTMLDivElement>document.getElementById('app');
const container = new PIXI.Container();
container.width = window.innerWidth;
container.height = window.innerHeight;
const app = new PIXI.Application({
    antialias: true,
    resizeTo: appContainer,
    background: '#f5f5f5',
});
appContainer.appendChild(<HTMLCanvasElement>app.view);

const square = new PIXI.Graphics();
let isSquareHighlight = false;

function drawSquare(object: PIXI.Graphics) {
    object.beginFill('#fff');
    object.drawRect(
        window.innerWidth / 2 - SQUARE_WIDTH / 2,
        window.innerHeight / 2 - SQUARE_HEIGHT / 2,
        SQUARE_WIDTH,
        SQUARE_HEIGHT
    );
    object.endFill();

    return object;
}

function highlightGraphics(object: PIXI.Graphics) {
    object.clear();
    object.lineStyle(2, '#0099ff', 1);
    drawSquare(object);
    isSquareHighlight = true;
}

function drawBackground() {
    const bg = new PIXI.Graphics();
    bg.beginFill('#f5f5f5');
    bg.drawRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );
    bg.endFill();

    return bg;
}

function clearHighlighting(object: PIXI.Graphics) {
    object.clear();
    drawSquare(object);
    isSquareHighlight = false;
}

const bg = drawBackground();
app.stage.addChild(bg);
app.stage.addChild(container);
container.addChild(drawSquare(square));

container.eventMode = 'static';
container.on('pointerdown', () => {
    highlightGraphics(square);
    console.log('is highlight', isSquareHighlight);
});

bg.eventMode = 'static';
bg.on('pointerdown', () => {
    clearHighlighting(square);
    console.log('is highlight', isSquareHighlight);
});