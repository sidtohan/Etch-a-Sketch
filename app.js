// Global Variables
const containerSize = 900 * 256;
const displaySize = document.querySelector('.display-size');
const gridContainer = document.querySelector('.grid-container');
const colorPicker = document.querySelector('.color-choice');
const slider = document.querySelector('.slider');
const clearBtn = document.querySelector('#clear-grid');
const randomColor = document.querySelector('#random-color');
const singleColor = document.querySelector('#single-color');
const eraser = document.querySelector('#eraser');
let currentOption = "single-color";
let currentColor = "#000000";

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
  } else if (currentOption === "random-color"){
    let r,g,b;
    r = Math.floor(Math.random()*256);
    g = Math.floor(Math.random()*256);
    b = Math.floor(Math.random()*256);
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  } else {
    e.target.style.backgroundColor = currentColor;
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

// animate the button on hover
function animateButtonHover(e){
  e.target.classList.add('animate-hover');
}

// animates the button
function animateButtonClickStart(e) {
  e.target.classList.add('animate-click');
}

// ends the animation
function animateButtonClickEnd(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove('animate-click');
}

function endAnimation(e){
  e.target.classList.remove('animate-hover');
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

// sets the color chosen by user into a variable for reference
function setColor(e){
  currentColor = e.target.value;
}

// intial code and event listeners added
initializeGrid(16);
addGridListeners();

// Buttons
clearBtn.addEventListener('click', clearGrid);
clearBtn.addEventListener('click', animateButtonClickStart);
clearBtn.addEventListener('mouseenter', animateButtonHover);
clearBtn.addEventListener('mouseleave', endAnimation);
clearBtn.addEventListener('transitionend', animateButtonClickEnd);

singleColor.addEventListener('click', changeChoice);
singleColor.addEventListener('click', animateButtonClickStart);
singleColor.addEventListener('mouseenter', animateButtonHover);
singleColor.addEventListener('mouseleave', endAnimation)
singleColor.addEventListener('transitionend', animateButtonClickEnd);

eraser.addEventListener('click', changeChoice);
eraser.addEventListener('click', animateButtonClickStart);
eraser.addEventListener('mouseenter', animateButtonHover);
eraser.addEventListener('mouseleave', endAnimation)
eraser.addEventListener('transitionend', animateButtonClickEnd);

randomColor.addEventListener('click', changeChoice);
randomColor.addEventListener('click', animateButtonClickStart);
randomColor.addEventListener('mouseenter', animateButtonHover);
randomColor.addEventListener('mouseleave', endAnimation)
randomColor.addEventListener('transitionend', animateButtonClickEnd);

slider.addEventListener('mouseup', stopSlider);
slider.addEventListener('input', updateDisplaySize);

colorPicker.addEventListener('input', setColor)