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

function drawSquare(object: PIXI.Graphics, width: number, height: number) {
    object.beginFill('#fff');
    object.drawRect(
        window.innerWidth / 2 - width / 2,
        window.innerHeight / 2 - height / 2,
        width,
        height
    );
    object.endFill();

    return object;
}

function scaleSquare(object: PIXI.Graphics) {
    console.log('width/height', {
        width: object.width,
        height: object.height,
    });
}

function highlightGraphics(object: PIXI.Graphics) {
    object.clear();
    object.lineStyle(1.5, '#0099ff', 1);
    drawSquare(object, SQUARE_WIDTH, SQUARE_HEIGHT);
    isSquareHighlight = true;
}

function clearHighlighting(object: PIXI.Graphics) {
    const width = object.width;
    const height = object.height;
    object.clear();
    drawSquare(object, width, height);
    isSquareHighlight = false;
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


const bg = drawBackground();
app.stage.addChild(bg);
app.stage.addChild(container);
container.addChild(drawSquare(square, SQUARE_WIDTH, SQUARE_HEIGHT));

container["eventMode"] = 'static';
container["on"]('pointerdown', () => {
    highlightGraphics(square);
});

bg["eventMode"] = 'static';
bg["on"]('pointerdown', () => {
    clearHighlighting(square);
});