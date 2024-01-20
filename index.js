const DUMMY_TEXT = "DUMMY TEXT";

const body = document.querySelector("body");
body.style.maxWidth = "960px";
body.style.maxHeight = "960px";
body.style.display = "block";
body.style.margin = "0 auto";
const button = document.createElement("button");
button.textContent = "Initialize Grid";
button.style.padding = "10px";
button.style.display = "block";
button.style.margin = "10px auto";
body.appendChild(button);

let gridContainer = document.createElement("div");
body.appendChild(gridContainer);

let length = 16;
let width = 16;
button.addEventListener("click", () => {
    length = prompt("Input length of grid (X axis)");
    while (length > 100 || length < 1){
        length = prompt("Length of grid must be within 1-100");
    }
    width = prompt("Input width of grid (Y axis)");
    while (width > 100 || width < 1){
        width = prompt("Width of grid must be within 1-100");
    }
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
        rowItems[i] = [length];
        for (let j = 0; j < length; j++){
            rowItems[i][j] = document.createElement("div");
            rowItems[i][j].style.cssText = "background-color: yellow; padding: 10px;";
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
    gridContainer.style.cssText = "display: flex; flex-direction: column; background-color: red; align-content: stretch;";
}

generateGrid();

 