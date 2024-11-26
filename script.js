'use strict';

const diceImage = document.querySelector('.dice');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const messageBox = document.querySelector('.message');

let activeTotalScore = document.querySelector('.player--active .score');
let activeCurrentScore = document.querySelector(
  '.player--active .current-score'
);
let chain = 0;

document.querySelector('#score--1').textContent = 0;
document.querySelector('#score--2').textContent = 0;
gameStart();

function rollDice() {
  const diceRoll = Math.trunc(Math.random(0, 1) * 6) + 1;
  changeDice(diceRoll);
  console.log(diceRoll);
}

function changeDice(diceRoll) {
  let newScore;
  switch (diceRoll) {
    case 1:
      diceImage.src = 'dice-1.png';
      if (chain === 0) {
        displayMessage(`Bad luck!`, 0);
      } else {
        displayMessage(`Greedy Pig!`, 0);
      }
      activeCurrentScore.textContent = 0;
      chain = 0;
      changeActivePlayer();
      break;
    case 2:
      diceImage.src = 'dice-2.png';
      displayMessage(`Rolled a 2!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
    case 3:
      diceImage.src = 'dice-3.png';
      displayMessage(`Rolled a 3!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
    case 4:
      diceImage.src = 'dice-4.png';
      displayMessage(`Rolled a 4!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
    case 5:
      diceImage.src = 'dice-5.png';
      displayMessage(`Rolled a 5!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
    case 6:
      diceImage.src = 'dice-6.png';
      displayMessage(`Rolled a 6!`, 0);
      chain++;
      calcScore(diceRoll);
      break;
  }
}

function calcScore(diceRoll) {
  let newScore = Number(activeCurrentScore.textContent) + diceRoll;
  activeCurrentScore.textContent = newScore;
}

function changeActivePlayer() {
  document.querySelector('.btn--roll').removeEventListener('click', rollDice);
  document.querySelector('.btn--hold').removeEventListener('click', buttonHold);
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
  document.querySelector('.btn--roll').addEventListener('click', rollDice);
  document.querySelector('.btn--hold').addEventListener('click', buttonHold);
  chain = 0;
}

function gameStart() {
  const coinToss = Math.trunc(Math.random(0, 1) * 2) + 1;
  let tossResult;
  displayMessage(`Tossing a coin...`, 0);
  console.log(`Tossing a coin...`);
  if (coinToss === 1) {
    tossResult = 'heads';
    displayMessage(`The result was ${tossResult}!`, 2000);
    displayMessage(`Player 1 goes first!`, 3000);
    addListeners();
  }
  if (coinToss === 2) {
    tossResult = 'tails';
    displayMessage(`The result was ${tossResult}!`, 2000);
    displayMessage(`Player 2 goes first!`, 3000);
    setTimeout(() => {
      changeActivePlayer();
      addListeners();
    }, 3000);
  }
}

function buttonHold() {
  displayMessage(`You bank your score!`, 0);
  console.log(`You hold!`);
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
      `${player} is the winner with a score of ${activeTotalScore.textContent}!`,
      1000
    );
    displayMessage(`Congratulations!`, 3000);
    console.log(
      `${player} is the winner with a score of ${activeTotalScore.textContent}! Congratulations!`
    );
    document.querySelector('.btn--roll').removeEventListener('click', rollDice);
    document
      .querySelector('.btn--hold')
      .removeEventListener('click', buttonHold);
    return false;
  }
  return true;
}

function displayMessage(message, delay) {
  setTimeout(() => {
    messageBox.textContent = message;
  }, delay);
}

function addListeners() {
  document.querySelector('.btn--roll').addEventListener('click', rollDice);
  document.querySelector('.btn--hold').addEventListener('click', buttonHold);
  document.querySelector('.btn--new').addEventListener('click', () => {
    location.reload();
  });
}
