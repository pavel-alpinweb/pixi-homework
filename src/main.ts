import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

const SQUARE_WIDTH = 250;
const SQUARE_HEIGHT = 250;
let isSquareHighlight = false;
const appContainer = <HTMLDivElement>document.getElementById('app');
const container = new PIXI.Container();
const square = new PIXI.Graphics();
const circleLeftTop = new PIXI.Graphics();
const circleRightTop = new PIXI.Graphics();
const circleLeftBottom = new PIXI.Graphics();
const circleRightBottom = new PIXI.Graphics();

container.width = window.innerWidth;
container.height = window.innerHeight;
const app = new PIXI.Application({
    antialias: true,
    resizeTo: appContainer,
    background: '#f5f5f5',
});
appContainer.appendChild(<HTMLCanvasElement>app.view);

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
function drawCircle(object: PIXI.Graphics, x: number, y: number) {
    object.beginFill('#0099ff');
    object.drawCircle(x, y, 10);
    object.endFill();
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

    drawCircle(
        circleLeftTop,
        window.innerWidth / 2 - (SQUARE_WIDTH / 2),
        window.innerHeight / 2 - (SQUARE_HEIGHT / 2),
    );

    drawCircle(
        circleRightTop,
        window.innerWidth / 2 + (SQUARE_WIDTH / 2),
        window.innerHeight / 2 - (SQUARE_HEIGHT / 2),
    );

    drawCircle(
        circleLeftBottom,
        window.innerWidth / 2 - (SQUARE_WIDTH / 2),
        window.innerHeight / 2 + (SQUARE_HEIGHT / 2),
    );

    drawCircle(
        circleRightBottom,
        window.innerWidth / 2 + (SQUARE_WIDTH / 2),
        window.innerHeight / 2 + (SQUARE_HEIGHT / 2),
    );
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
container.addChild(circleLeftTop);
container.addChild(circleRightTop);
container.addChild(circleLeftBottom);
container.addChild(circleRightBottom);

container["eventMode"] = 'static';
container["on"]('pointerdown', () => {
    highlightGraphics(square);
});

bg["eventMode"] = 'static';
bg["on"]('pointerdown', () => {
    circleLeftTop.clear();
    circleRightTop.clear();
    circleLeftBottom.clear();
    circleRightBottom.clear();
    clearHighlighting(square);
});

circleLeftTop["eventMode"] = 'static';
circleLeftTop.cursor = 'nw-resize';

circleRightTop["eventMode"] = 'static';
circleRightTop.cursor = 'ne-resize';

circleLeftBottom["eventMode"] = 'static';
circleLeftBottom.cursor = 'sw-resize';

circleRightBottom["eventMode"] = 'static';
circleRightBottom.cursor = 'se-resize';