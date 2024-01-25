const DUMMY_TEXT = "DUMMY TEXT";

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
let itemSize = 960 / (length * width);
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
    initializeItemSize();
    generateGrid();
})


function generateGrid(){
    body.removeChild(gridContainer);
    initializeGridContainer();
    const rowContainers = [width];
    const rowItems = [width];
    for (let i = 0; i < width; i++){
        rowContainers[i] = document.createElement("div");
        rowContainers[i].style.cssText = "display: flex; flex-direction: row; background-color: blue;";
        rowContainers[i].style.flexGrow = 1;
        rowItems[i] = [length];

        for (let j = 0; j < length; j++){
            rowItems[i][j] = document.createElement("div");
            rowItems[i][j].style.flexGrow = 1;

            rowItems[i][j].style.backgroundColor = "yellow";
            rowItems[i][j].addEventListener("mouseenter", (e) => {
                e.currentTarget.style.backgroundColor = "black";
            })
            rowContainers[i].appendChild(rowItems[i][j]);
        }
        gridContainer.appendChild(rowContainers[i]);
    }

    body.appendChild(gridContainer);
}

function initializeGridContainer(){
    gridContainer = document.createElement("div");
    gridContainer.setAttribute("id", "gridContainer");
    gridContainer.style.cssText = "display: flex; flex-direction: column; background-color: red;";
    gridContainer.style.maxWidth = "960px";
    gridContainer.style.minWidth = "960px";
    gridContainer.style.minHeight = "780px";
    gridContainer.style.maxHeight = "780px";
}

function initializeItemSize(){
    itemSize = 960 / (width * length);
}
generateGrid();

 