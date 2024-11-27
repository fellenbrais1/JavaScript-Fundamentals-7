// INFO

// The pig game needs players to roll dice and accumulate a score. The current score will go up as long as the roll is not a 1. In the case of a 1, the player loses all current points and the other player starts their turn. A player can bank their points when they want and this will add them to their real total score. The first player to accumulate 100 or more points is the winner.

'use strict';

// Defining useful constants
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImage = document.querySelector('.dice');
const messageBox = document.querySelector('.message');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');

// Defining other useful variables
let activeTotalScore = document.querySelector('.player--active .score');
let activeCurrentScore = document.querySelector(
  '.player--active .current-score'
);
let chain = 0;
let isHoverEnabled = false;

// Setting the initial display of the total score elements
document.querySelector('#score--1').textContent = 0;
document.querySelector('#score--2').textContent = 0;

// Initializes the game and determines who starts first
newButtonSetUp();
gameStart();

// Sets up the behaviour of the 'new game' button's outline on hover
// Runs automatically at the beginning of a game
function newButtonSetUp() {
  newBtn.addEventListener('mouseover', () => {
    newBtn.classList.add('hovered');
  });
  newBtn.addEventListener('mouseout', () => {
    newBtn.classList.remove('hovered');
  });
}

// Decides which player starts first by simulating a coin toss
// Runs automatically at the beginning of a game
function gameStart() {
  const coinToss = Math.trunc(Math.random(0, 1) * 2) + 1;
  coinFlip();
  let tossResult;
  displayMessage(`Tossing a coin...`, 0);
  if (coinToss === 1) {
    tossResult = 'heads';
    displayMessage(`The result was ${tossResult}!`, 2000);
    displayMessage(`Player 1 goes first!`, 3000);
    setTimeout(() => {
      addListeners();
      toggleHover();
    }, 3500);
    displayMessage(`Player 1's turn!`, 4000);
  }
  if (coinToss === 2) {
    tossResult = 'tails';
    displayMessage(`The result was ${tossResult}!`, 2000);
    displayMessage(`Player 2 goes first!`, 3000);
    setTimeout(() => {
      changeActivePlayer();
      addListeners();
      toggleHover();
    }, 3500);
  }
}

// Add event listeners to the buttons when needed
// Called by gameStart()
function addListeners() {
  rollBtn.addEventListener('click', rollDice);
  holdBtn.addEventListener('click', buttonHold);
  newBtn.addEventListener('click', () => {
    location.reload();
  });
}

// Toggles the hover state of the roll and bank buttons depending on the state of the game, i.e. disabled during turn changes
// Called by gameStart(), changeActivePlayer()
function toggleHover() {
  if (!isHoverEnabled) {
    rollBtn.classList.remove('nohover');
    holdBtn.classList.remove('nohover');
    rollBtn.addEventListener('mouseover', () => {
      rollBtn.classList.add('hovered');
    });
    rollBtn.addEventListener('mouseout', () => {
      rollBtn.classList.remove('hovered');
    });
    holdBtn.addEventListener('mouseover', () => {
      holdBtn.classList.add('hovered');
    });
    holdBtn.addEventListener('mouseout', () => {
      holdBtn.classList.remove('hovered');
    });
    isHoverEnabled = true;
    return;
  } else {
    rollBtn.classList.add('nohover');
    holdBtn.classList.add('nohover');
    isHoverEnabled = false;
    return;
  }
}

// Displays messages with a delay to the 'message' element
// Called by gameStart(), changeActivePlayer(), buttonHold(), changeDice(), and checkWinner()
function displayMessage(message, delay) {
  setTimeout(() => {
    messageBox.textContent = message;
  }, delay);
}

// Changes which player is active under certain conditions
// Called by gameStart(), changeDice(), and buttonHold()
function changeActivePlayer() {
  toggleHover();
  rollBtn.removeEventListener('click', rollDice);
  holdBtn.removeEventListener('click', buttonHold);
  if (player1.classList.contains('player--active')) {
    displayMessage(`Player 2's turn!`, 1000);
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else {
    displayMessage(`Player 1's turn!`, 1000);
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
  activeTotalScore = document.querySelector('.player--active .score');
  activeCurrentScore = document.querySelector('.player--active .current-score');
  setTimeout(() => {
    rollBtn.addEventListener('click', rollDice);
    holdBtn.addEventListener('click', buttonHold);
    toggleHover();
    chain = 0;
  }, `1500`);
}

// Banks the current score if any and allows player switching
// Called by clicking the 'bank' button
function buttonHold() {
  displayMessage(`You bank your score!`, 0);
  bank();
  let newScore =
    Number(activeTotalScore.textContent) +
    Number(activeCurrentScore.textContent);
  activeTotalScore.textContent = newScore;
  activeCurrentScore.textContent = 0;
  let moveOn = checkWinner();
  if (moveOn) {
    changeActivePlayer();
  }
}

// Generate a randomised d6 roll
// Called by clicking the 'roll dice' button
function rollDice() {
  const diceRoll = Math.trunc(Math.random(0, 1) * 6) + 1;
  dice();
  changeDice(diceRoll);
}

// Changes the dice image and handle scores and rolls of 1
// Called by rollDice()
function changeDice(diceRoll) {
  switch (diceRoll) {
    case 1:
      diceImage.src = 'img/dice-1.png';
      if (chain === 0) {
        displayMessage(`Bad luck!`, 0);
        badLuck();
      } else {
        displayMessage(`Greedy Pig!`, 0);
        oink();
        setTimeout(() => {
          diceImage.src = 'img/pig.png';
        }, 1000);
      }
      activeCurrentScore.textContent = 0;
      chain = 0;
      changeActivePlayer();
      break;
    case 2:
      diceImage.src = 'img/dice-2.png';
      displayMessage(`Rolled a 2!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
    case 3:
      diceImage.src = 'img/dice-3.png';
      displayMessage(`Rolled a 3!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
    case 4:
      diceImage.src = 'img/dice-4.png';
      displayMessage(`Rolled a 4!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
    case 5:
      diceImage.src = 'img/dice-5.png';
      displayMessage(`Rolled a 5!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
    case 6:
      diceImage.src = 'img/dice-6.png';
      displayMessage(`Rolled a 6!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
  }
}

// Calculates the new current score based on the dice roll
// Called by changeDice()
function calcScore(diceRoll) {
  let newScore = Number(activeCurrentScore.textContent) + diceRoll;
  activeCurrentScore.textContent = newScore;
}

// Checks to see if a player has a winning score and handles a win
// Called by buttonHold()
function checkWinner() {
  if (activeTotalScore.textContent >= 100) {
    let player;
    if (player1.classList.contains('player--active')) {
      player1.classList.add('player--winner');
      player = 'player 1';
    } else {
      player2.classList.add('player--winner');
      player = 'player 2';
    }
    displayMessage(
      `${player} is the winner with ${activeTotalScore.textContent} points!`,
      1000
    );
    setTimeout(() => {
      win();
    }, 2000);
    displayMessage(`Congratulations ${player}!`, 3000);
    rollBtn.removeEventListener('click', rollDice);
    holdBtn.removeEventListener('click', buttonHold);
    return false;
  }
  return true;
}

function oink() {
  const oinkSound = document.getElementById('oink');
  oinkSound.play();
}

function bank() {
  const bankSound = document.getElementById('bank');
  bankSound.play();
}

function win() {
  const winSound = document.getElementById('win');
  winSound.play();
}

function dice() {
  const diceSound = document.getElementById('dice');
  diceSound.play();
}

function badLuck() {
  const badLuckSound = document.getElementById('badluck');
  badLuckSound.play();
}

function coinFlip() {
  const coinFlipSound = document.getElementById('coinflip');
  coinFlipSound.play();
}

// NOTES

// To help us plan out the program flow of a project, we could draw a diagram, a free resource to do this on is 'diagrams.net'

// In addition to querySelector, we can also use the getElementById method on the document to get an element from its ID. This operates more quickly than querySelector but is much less commonly used. You specify the name of the ID without a # in the parentheses e.g.

// document.getElementById('score--1');

// This is most useful when the website has to select and apply things to hundreds of different elements and time can be of the essence.
