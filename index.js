const DUMMY_TEXT = "DUMMY TEXT";
const GRID_WIDTH = "960px";
const GRID_HEIGHT = "780px";

const body = document.querySelector("body");
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.alignItems = "center";
body.style.margin = "0 auto";


const button = document.createElement("button");
button.textContent = "Initialize Grid";
button.style.fontSize = "1em";
button.style.padding = "20px";
button.style.margin = "20px";
body.appendChild(button);

let gridContainer = document.createElement("div");
body.appendChild(gridContainer);

let length = 16;
let width = 16;

function initializeGridContainer(){
    gridContainer = document.createElement("div");
    gridContainer.setAttribute("id", "gridContainer");
    gridContainer.style.cssText = "display: flex; flex-direction: column; background-color: red;";
    gridContainer.style.maxWidth = GRID_WIDTH;
    gridContainer.style.minWidth = GRID_WIDTH;
    gridContainer.style.minHeight = GRID_HEIGHT;
    gridContainer.style.maxHeight = GRID_HEIGHT;
}

function generateGrid(){
    body.removeChild(gridContainer);
    initializeGridContainer();
    const rowContainers = [width];
    const rowItems = [width];
    const rowItemsCounter = [width];
    const rowItemsOrigColors = [width];
    for (let i = 0; i < width; i++){
        rowContainers[i] = document.createElement("div");
        rowContainers[i].style.cssText = "display: flex; flex-direction: row; background-color: blue;";
        rowContainers[i].style.flexGrow = 1;
        rowItems[i] = [length];
        rowItemsCounter[i] = [length];
        rowItemsOrigColors[i] = [length];
        for (let j = 0; j < length; j++){
            rowItems[i][j] = document.createElement("div");
            rowItems[i][j].style.flexGrow = 1;
            rowItemsCounter[i][j] = 0;
            rowItemsOrigColors[i][j] = [3];

            rowItems[i][j].style.backgroundColor = "yellow";
            rowItems[i][j].addEventListener("mouseenter", (e) => {
                rowItemsCounter[i][j]++;
                let bg_rgb = "";
                let colors = "";
                if (rowItemsCounter[i][j] < 2){
                    e.currentTarget.style.backgroundColor = generateRGB();
                    bg_rgb = e.currentTarget.style.backgroundColor;
                    colors = bg_rgb.match(/([0-9]+), ([0-9]+), ([0-9]+)/);
                    rowItemsOrigColors[i][j][0] = colors[1];
                    rowItemsOrigColors[i][j][1] = colors[2];
                    rowItemsOrigColors[i][j][2] = colors[3];
                }
                else{
                    bg_rgb = e.currentTarget.style.backgroundColor;
                    colors = bg_rgb.match(/([0-9]+), ([0-9]+), ([0-9]+)/);
                    let rr = darkenColor(rowItemsOrigColors[i][j][0], colors[1]);
                    let gg = darkenColor(rowItemsOrigColors[i][j][1], colors[2]);
                    let bb = darkenColor(rowItemsOrigColors[i][j][2], colors[3]);
                    e.currentTarget.style.backgroundColor = `rgb(${rr}, ${gg}, ${bb})`;
                }
            })
            rowContainers[i].appendChild(rowItems[i][j]);
        }
        gridContainer.appendChild(rowContainers[i]);
    }

    body.appendChild(gridContainer);
}

button.addEventListener("click", () => {
    length = prompt("Input number of columns (X axis)");
    while (length > 100 || length < 1 ){
        length = prompt("Number of columns must be within 1-100");
        if (length == undefined) break;
    }
    width = prompt("Input number of rows (Y axis)");
    while (width > 100 || width < 1){
        width = prompt("Number of rows must be within 1-100");
        if (width == undefined) break;
    }
    generateGrid();
})

function generateRGB(){
    let r = generateColorValue();
    let g = generateColorValue();
    let b = generateColorValue();
    return `rgb(${r}, ${g}, ${b})`;
}

function generateColorValue(){
    return Math.floor(Math.random() * 255);
}

function darkenColor(origColor, color){
    let output = color - Math.ceil((origColor / 10));
    return (output < 0) ? 0 : output;
}


generateGrid();