const containerSize = 900 * 256;

function initializeGrid(size) {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.setAttribute('style',
    `display: grid; 
  height: 480px;
  width: 480px;
  grid-template-columns: repeat(${size},1fr);
  border: 2px solid black;
  overflow: hidden;
  `)

  // using for loop to add specified number of boxes
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // creating the required div
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
    item.addEventListener('mouseenter', setGridColor);
  });
}

function setGridColor(e) {
  e.target.style.backgroundColor = "black";
}

// clears the grid
function clearGrid(e) {
  const coloredBoxes = document.querySelectorAll('.grid-item');
  e.target.classList.add('clear-grid-animate');
  coloredBoxes.forEach(box => {
    if(box.getAttribute('style')){
      box.removeAttribute('style');
    }
  });
}

function animateButton(e){
  if(e.propertyName != 'transform') return;
  e.target.classList.remove('clear-grid-animate');
}

function newGrid(size) {
  const gridContainer = document.querySelector('.grid-container');
  // Clearing the grid container
  gridContainer.innerHTML = "";

  // intializing the new grid
  initializeGrid(size);
  addGridListeners();
  // need to add listeners again

}

// intializing the grid
initializeGrid(16);
addGridListeners();

// setting up the button
const btn = document.querySelector('#clear-grid');
btn.addEventListener('click', clearGrid);
btn.addEventListener('transitionend', animateButton);

const displaySize = document.querySelector('.display-size');
const slider = document.querySelector('.slider');
slider.oninput = function() {
  newGrid(this.value);
  displaySize.textContent = `${this.value}`;
}
