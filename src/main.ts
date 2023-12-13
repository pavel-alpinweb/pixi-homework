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
let originalWidth = SQUARE_WIDTH;
let originalHeight = SQUARE_HEIGHT;
let originalSquareX = 0;
let original_mouse_x = 0;
let original_mouse_y = 0;
type direction = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

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

function scaleSquare(event, direction: direction) {
    switch (direction) {
        case 'top-right':
            circleRightTop.x = event.global.x - ((window.innerWidth / 2) + (square.width / 2));
            circleRightTop.y = event.global.y - ((window.innerHeight / 2) - (square.height / 2));
            square.width = originalWidth + (event.global.x - original_mouse_x);
            square.height = originalHeight - (event.global.y - original_mouse_y);
            break;
        case 'top-left':
            circleLeftTop.x = event.global.x - ((window.innerWidth / 2) - (square.width / 2));
            circleLeftTop.y = event.global.y - ((window.innerHeight / 2) - (square.height / 2));
            square.width = originalWidth - (event.global.x - original_mouse_x);
            square.height = originalHeight - (event.global.y - original_mouse_y);
            break;
    }

}

function highlightGraphics(object: PIXI.Graphics) {
    object.clear();
    object.lineStyle(1.5, '#0099ff', 1);
    drawSquare(object, originalWidth, originalHeight);
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
    object.clear();
    drawSquare(object, originalWidth, originalHeight);
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
// Listen to pointermove on stage once handle is pressed.
function onDragStart(direction: direction)
{
    app.stage["eventMode"]  = 'static';
    app.stage.addEventListener('pointermove', (event) => {
        scaleSquare(event, direction);
    });
}

// Stop dragging feedback once the handle is released.
function onDragEnd(direction: direction)
{
    app.stage["eventMode"]  = 'auto';
    app.stage.removeEventListener('pointermove', (event) => {
        scaleSquare(event, direction);
    });
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
circleLeftTop["on"]('pointerdown', (event) => {
    original_mouse_x = event.globalX;
    original_mouse_y = event.globalY;
    originalWidth = square.width;
    originalHeight = square.height;
    onDragStart('top-left');
})
    ["on"]('pointerup', () => {
    onDragEnd('top-left');
})
    ["on"]('pointerupoutside', () => {
    onDragEnd('top-left');
});

circleRightTop["eventMode"] = 'static';
circleRightTop.cursor = 'ne-resize';
circleRightTop["on"]('pointerdown', (event) => {
    original_mouse_x = event.globalX;
    original_mouse_y = event.globalY;
    originalWidth = square.width;
    originalHeight = square.height;
    onDragStart('top-right');
})
    ["on"]('pointerup', () => {
    onDragEnd('top-right');
})
    ["on"]('pointerupoutside', () => {
    onDragEnd('top-right');
});

// circleLeftBottom["eventMode"] = 'static';
// circleLeftBottom.cursor = 'sw-resize';
// circleLeftBottom["on"]('pointerdown', onDragStart)
//     ["on"]('pointerup', onDragEnd)
//     ["on"]('pointerupoutside', onDragEnd);
//
// circleRightBottom["eventMode"] = 'static';
// circleRightBottom.cursor = 'se-resize';
// circleRightBottom["on"]('pointerdown', onDragStart)
//     ["on"]('pointerup', onDragEnd)
//     ["on"]('pointerupoutside', onDragEnd);