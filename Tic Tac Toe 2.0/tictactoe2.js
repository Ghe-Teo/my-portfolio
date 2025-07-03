const clickSound = new Audio('pop.mp3'); //to add in the event listener when the user clicks a cell

const currentPlayerDisplay = document.querySelector('.current-player'); //this will display who is the current player
let startingPlayer = "X"; //i had to add this to keep track of alternating players after each round
let currentPlayer = startingPlayer;
currentPlayerDisplay.innerHTML = `Player ${currentPlayer}'s turn`; // innitiate starting player

const gameCountDisplay = document.querySelector('.game-count'); //selects where in the DOM we display gameCount
let gameCount= 0; //this will keep track of how many games have been played, innitiate game count at 0
gameCountDisplay.innerHTML = gameCount; //display how many games have been played

const xWinCountDisplay = document.querySelector('.x-win-count'); //selects where in the DOM we display xWinCount
let xWinCount= 0; //this will keep track of how many times x has won, innitiate win count at 0
xWinCountDisplay.innerHTML = xWinCount; //display how many times x has won

const oWinCountDisplay = document.querySelector('.o-win-count'); //selects where in the DOM we display oWinCount
let oWinCount= 0; //this will keep track of how many times o has won, innitiate win count at 0
oWinCountDisplay.innerHTML = oWinCount; //display how many times o has won

const xWinRateDisplay = document.querySelector('.x-win-rate'); //selects where in the DOM we display xWinRate
let xWinRate; //this will calculate x win rate
xWinRateDisplay.innerHTML = `(win rate: 0%)`; //display of x win rate, innitiated at 0%

const oWinRateDisplay = document.querySelector('.o-win-rate'); //selects where in the DOM we display oWinRate
let oWinRate; //this will calculate o win rate
oWinRateDisplay.innerHTML = `(win rate: 0%)`; //display o win rate, innitiated at 0%


//Winning combinations for cells with same string
const cells = document.querySelectorAll('.col-4'); //this is an array-like nodeList of each .col-4, this way i don't have to use .cell-1, .cell-2 etc., but their index instead, this way i can use cell[0].innerHtml to check the value of the first .col-4 an so on
const winCombos = [ //Each inner array lists the positions by index in the grid that form a winning line.
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // main diagonal
  [2, 4, 6]  // anti diagonal
];

//win condition function:
function checkWinner() { //it will loop through all the win combos
  for (let combo of winCombos) { //we create a combo variable that will take as value one of the arrays in winCombos, and for each we check if:
    const [a, b, c] = combo; //this line is using destructuring to pull out the three indexes from each combo
    const valA = cells[a].innerHTML; //we create valA, valB an valC and associate them with innHtml of .col-4 in question
    const valB = cells[b].innerHTML;
    const valC = cells[c].innerHTML;

    if (valA && valA === valB && valB === valC) { //valA && checks to make sure valA is not empty. valA === valB && valB === valC this checks to see if all 3 values are the same
      combo.forEach(index => { //for the winning combo adds the class .win-highlight
        cells[index].classList.add('win-highlight');
      });
      return valA; // either "X" or "O"
    }
  }
  return null; //
}

//calculate win rates and updates html
function updateWinRates() { //initially i had this in check winner condition, for both x and o, it was redundant so i made a function and called it instead
  xWinRate = Math.round((xWinCount / gameCount) * 100);
  oWinRate = Math.round((oWinCount / gameCount) * 100);
  xWinRateDisplay.innerHTML = `(win rate: ${xWinRate}%)`;
  oWinRateDisplay.innerHTML = `(win rate: ${oWinRate}%)`;
}

//alternating players function
function toggleStartingPlayer() {
  startingPlayer = startingPlayer === "X" ? "O" : "X"; // short version of writing if startingPlayer is X, then replace with O, otherwise set it to X
  currentPlayer = startingPlayer;
  currentPlayerDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

//game function:
document.querySelectorAll('.col-4').forEach((element) => { //we select all .col-4 and turn them into js elements
  element.addEventListener('click', function () { //when we click on the element:
    element.innerHTML = currentPlayer; //the element is filled with either X or O
    element.style.pointerEvents = 'none'; // disables further clicks on the element
    clickSound.currentTime = 0; // rewind to start if it was already playing
    clickSound.play(); //plays the pop sound

    //Alternate current player:
    if (currentPlayer === "X") {
        currentPlayer = "O";
        } else {
        currentPlayer = "X";
    } //the shortened version of writing this is: currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Update current player
    currentPlayerDisplay.innerHTML = `Player ${currentPlayer}'s turn`;

    //Check for winner
    const winner = checkWinner(); //winner takes the value returned by checkWinner, either X or O, 
    if (winner) { //if the value is not null, then:
        currentPlayerDisplay.innerHTML = `Player ${winner} wins!`; //displays winner
        gameCount++; //add 1 every time a game is won
        gameCountDisplay.innerHTML = gameCount; //updates count in html
        cells.forEach(cell => cell.style.pointerEvents = 'none'); //player is not able to click on .col-4 anymore
        if (winner === "X") { //if the winner is X
          xWinCount++; //+1 to his win count
          xWinCountDisplay.innerHTML = xWinCount; //updates html count
          updateWinRates();
        } else {
          oWinCount++;
          oWinCountDisplay.innerHTML = oWinCount;
          updateWinRates();
        };
        return; //Prevents further code, like draw check below, from running
    }

    //check for draw
    const draw = [...cells].every(cell => cell.innerHTML !== ""); // "[...cells]" This is called the spread operator. It turns a NodeList into a real array, so that you can safely use array methods like .every() on it. It checks every element in "cells" one by one, assigns it temporarily to "cell" and checks its value to make sure it's not an empty string.
    if (draw) { //if all cells are not empty and if winner still returns null:
        currentPlayerDisplay.innerHTML = `Draw!`; //display draw message instead of current player turn
        gameCount++; //add 1 every time a game is won
        gameCountDisplay.innerHTML = gameCount; //updates count in html
        return;
    }
  });
});

//play again button
const playAgainBtn = document.getElementById('play-again');
playAgainBtn.addEventListener('click', () => {
  // Clear all cells and re-enable clicking
  cells.forEach(cell => { //cells is a nodeList but modern browser support forEach()
    cell.innerHTML = "";
    cell.style.pointerEvents = "auto";
  });

  //removes highlight
  cells.forEach(cell => {
    cell.classList.remove('win-highlight');
  });

  // alternate starting player:
  toggleStartingPlayer();
});

//reset button
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
  // Clear all cells and re-enable clicking
  cells.forEach(cell => { //cells is a nodeList but modern browser support forEach()
    cell.innerHTML = "";
    cell.style.pointerEvents = "auto";
  });
  
  //removes highlight
  cells.forEach(cell => {
    cell.classList.remove('win-highlight');
  });

  //reset score
  gameCount = 0;
  currentPlayerDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
  gameCountDisplay.innerHTML = gameCount; //updates count in html
  xWinCount = 0;
  xWinCountDisplay.innerHTML = xWinCount; //updates html count
  oWinCount = 0;
  oWinCountDisplay.innerHTML = oWinCount; //updates html count
  xWinRateDisplay.innerHTML = `(win rate: 0%)`;
  oWinRateDisplay.innerHTML = `(win rate: 0%)`;
  //reset starting player
  startingPlayer = "X";
  currentPlayer = startingPlayer;
  currentPlayerDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
});

