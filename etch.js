const colorPicker = document.querySelector('#colorpicker');
const container = document.querySelector('#container');
const pixelRange = document.querySelector('#pixel-range');
const pixelDisplay = document.querySelector('#pixel-display');
const chooseColorBut = document.querySelector('#chooseColor-but');
const randomColorBut = document.querySelector('#random-but');
const clearBut = document.querySelector('#clear-but');
const eraserBut = document.querySelector('#erase-but');
const changeBackgroundColor = document.querySelector('#backgroundChange-but');
const bgColor = document.querySelector('#bg-color'); 

let AllBackgroundColor = bgColor.value;
let color = "#128C31";
let gridPixel = 1;
let isColorChoose = true;
let isRandom = false;
let isEraser = false;
let mouseDown = false;

function createGrids(){
    let newGrid = document.createElement('div');
    newGrid.className = 'grid-element';
    newGrid.style.backgroundColor = bgColor.value;
    newGrid.addEventListener('mousedown', isMouseDown);
    newGrid.addEventListener('mouseup', isMouseUp);
    newGrid.addEventListener('mousemove', changeColor);
    container.appendChild(newGrid);
}

function findPixel() {
    container.style.display = 'grid';
    gridPixel = pixelRange.value;
    pixelDisplay.textContent = `${gridPixel} x ${gridPixel}`;
    let allGrids = document.querySelectorAll('.grid-element');
    container.style.gridTemplateColumns = `repeat(${gridPixel}, 1fr)`;
    for (let i = 0; i < allGrids.length; i++) {
        allGrids[i].remove();
    }
    for (let i = 0; i < gridPixel * gridPixel; i++) {
        createGrids();
    }
}

function colorChoose() {
    isColorChoose = true;
    isRandom = false;
    isEraser = false;
    chooseColorBut.style.color = 'white';
    randomColorBut.style.color = 'black';
    randomColorBut.style.background = 'none';
    chooseColorBut.style.backgroundColor = 'rgb(63, 62, 62)';
}

function colorChooseRandom() {
    isColorChoose = false;
    isRandom = true;
    isEraser = false;
    randomColorBut.style.color = 'white'
    chooseColorBut.style.color = 'black';
    randomColorBut.style.backgroundColor = 'rgb(63, 62, 62)';
    chooseColorBut.style.background = 'none';
}

function eraseColor() {
    isColorChoose = false;
    isRandom = false;
    isEraser = true;
}

function isMouseDown() {
    mouseDown = true;
}

function isMouseUp() {
    mouseDown = false;
}

function changeColor(e) {
    if (mouseDown === true) {
        if (isColorChoose) {
            findColor();
            e.target.style.backgroundColor = color;
        }
        if (isRandom) {
            e.target.style.backgroundColor = randomColorGenerator();
        }
        if (isEraser) {
            e.target.style.backgroundColor = '#ffffff';
        }
    }
}

function findColor() {
    color = colorPicker.value;
}

function randomColorGenerator() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

pixelRange.addEventListener('change', findPixel);
colorPicker.addEventListener('change', findColor);
chooseColorBut.addEventListener('click', colorChoose);
randomColorBut.addEventListener('click', colorChooseRandom);
clearBut.addEventListener('click', findPixel);
eraserBut.addEventListener('click', eraseColor);
changeBackgroundColor.addEventListener('click', findPixel);