const containerSize = 900 * 256;

function initializeGrid(size) {
  // selecting the grid container
  const gridContainer = document.querySelector('.grid-container');

  // using for loop to add 256 boxes
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // creating the required div
      let gridItem = document.createElement('div');
      gridItem.classList.add("grid-item");
      gridContainer.appendChild(gridItem);
    }
  }
}

function addGridListeners() {
  let gridItemList = document.querySelectorAll('.grid-item');
  gridItemList.forEach(item => {
    item.addEventListener('mouseenter', setGridColor);
  });
}

function setGridColor(e) {
  e.target.style.backgroundColor = "black";
}

function newGrid(){
  let user;
  do {
    user = parseInt(prompt("Enter the number of squares per side: "));
    if (user >= 100){
      alert("Please enter a size < 100");
    } 
  } while (user >= 100);

  const gridContainer = document.querySelector('.grid-container');
  // Clearing the grid container
  gridContainer.innerHTML = "";

  // using inline styles to overide the default size
  gridContainer.setAttribute('style', `display: grid;
  grid-template-columns: repeat(${user},30px);
  grid-auto-rows: 30px;`)

  // intializing the new grid
  initializeGrid(user);
  addGridListeners();
  // need to add listeners again

}

// intializing the grid
initializeGrid(16);
addGridListeners();

// setting up the button
const clearButton = document.querySelector('.clear-grid');
clearButton.onclick = newGrid;