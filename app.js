function initializeGrid() {
  // selecting the grid container
  const gridContainer = document.querySelector('.grid-container');

  // using for loop to add 256 boxes
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
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
  console.log(e.target);
}


// intializing the grid
initializeGrid();
addGridListeners();
