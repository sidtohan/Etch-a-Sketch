// Global Variables
const containerSize = 900 * 256;
const displaySize = document.querySelector('.display-size');
const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const clearBtn = document.querySelector('#clear-grid');
const singleColor = document.querySelector('#single-color');
const eraser = document.querySelector('#eraser');
let currentOption = "single-color";


// Functions
function initializeGrid(size) {
  gridContainer.setAttribute('style',
    `display: grid; 
  height: 480px;
  width: 480px;
  grid-template-columns: repeat(${size},1fr);
  border: 2px solid black;
  overflow: hidden;
  flex-shrink: 0;
  `)

  // creating the required size by using nested for loop
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let gridItem = document.createElement('div');
      gridItem.classList.add("grid-item");
      gridContainer.appendChild(gridItem);
    }
  }
}

// function for adding listeners to the grid element
function addGridListeners() {
  let gridItemList = document.querySelectorAll('.grid-item');
  gridItemList.forEach(item => {
    item.addEventListener('mouseenter', changeGridItem);
  });
}

// sets the color of grid item on hovering
function changeGridItem(e) {
  if (currentOption === "eraser") {
    e.target.removeAttribute('style');
  } else {
    e.target.style.backgroundColor = "black";
  }
}

// clears the grid
function clearGrid(e) {
  const coloredBoxes = document.querySelectorAll('.grid-item');
  e.target.classList.add('clear-grid-animate');
  coloredBoxes.forEach(box => {
    if (box.getAttribute('style')) {
      box.removeAttribute('style');
    }
  });
}

// animates the clear grid button
function animateButton(e) {
  if (e.propertyName != 'transform') return;
  e.target.classList.remove('clear-grid-animate');
}

// creates a new grid by a) clearing it, and b) calling the intialized
// grid function with the required size
function newGrid(size) {
  const gridContainer = document.querySelector('.grid-container');

  // grid cleared by setting inner html as empty string
  gridContainer.innerHTML = "";
  initializeGrid(size);

  addGridListeners();
  // need to add listeners again

}

// detects when the mouse has released the slider
function stopSlider(e) {
  newGrid(e.target.value);
}

function updateDisplaySize(e) {
  displaySize.textContent = `${e.target.value}x${e.target.value}`;
}

function changeChoice(e) {
  currentOption = this.value;
}

// intial code and event listeners added
initializeGrid(16);
addGridListeners();

// Buttons
clearBtn.addEventListener('click', clearGrid);
clearBtn.addEventListener('transitionend', animateButton);

singleColor.addEventListener('click', changeChoice);

eraser.addEventListener('click', changeChoice)

slider.addEventListener('mouseup', stopSlider);
slider.addEventListener('input', updateDisplaySize);
