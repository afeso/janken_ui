// some mini REGEX
var goodReg = new RegExp("Win");
var badReg = new RegExp("Loose","i"); // case insensitive RegExp
var neutralReg = new RegExp("Invalid");

//scores counter initialized at 0
let playerScore = 0;
let computerScore = 0;
let tie = 0;
let invalid_game = 0;

//the below function returns a creates a random number from 0 - 2
// each randon number returns rock, paper, or scissors with a conditional
// statement.
function computerPlay() {
  const computer = Math.floor(Math.random() * 3);
  if (computer == 0) {
    return 'rock';
  } else if (computer == 1) {
    return 'paper';
  } else if (computer == 2) {
    return 'scissors';
  } else {
    return 'Invalid';
  }
}

// the main rock paper scissors function.
// this uses a string from the player and calls the computerPlay Function
// and plays both strings against each other and returns win or lose to the
// player. JanKen is just the japanese word for Rock Paper Scissors
// and its way shorter so i used it for the function name.
function janken(playerSelection, computerSelection) {
  const player = playerSelection.toLowerCase();
  const pc = computerSelection.toLowerCase();

  if (player == 'rock') {
    if (pc == 'paper') {
      return 'You loose! Paper beats Rock';
    } else if (pc == 'scissors') {
      return 'You Win! Rock beats Scissors';
    } else {
      return 'Its a tie.';
    }
  } else if (player == 'paper') {
    if (pc == 'paper') {
      return 'Its a tie.';
    } else if (pc == 'scissors') {
      return 'You Loose! Scissors beats Paper';
    } else {
      return 'You Win! Paper beats Rock';
    }
  } else if (player == 'scissors') {
    if (pc == 'paper') {
      return 'You Win! Scissors beats paper';
    } else if (pc == 'rock') {
      return 'You Loose! Rock beats Scissors';
    } else {
      return 'Its a tie.'
    }
  } else {
    return 'Player made an Invalid Selection';
  }
}

// this function plays janken
// and increments the player or computer scores
function game(player) {
  var result =  janken(player, computerPlay());
  console.log(result);  // dubugging
  outsideResult = result;

  if (goodReg.test(result)) {
    playerScore++;
  } else if (badReg.test(result)) {
    computerScore++;
  } else if (neutralReg.test(result)) {
    invalid_game++
  } else {
    tie++;
  }

  console.log(`The score is PLAYER: ${playerScore},\
     COMPUTER: ${computerScore}, \
     ${tie} tie(s) and ${invalid_game} Invalid game(s)`);
}

// Creating DOM Manipulating objects

let outsideResult; // will get its value from the gameFunction result variable
const buttons = document.querySelectorAll('button');
const player = document.getElementById('p1');
const computer = document.getElementById('comp');
const ties = document.getElementById('tie1');
const desc = document.getElementById('description');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const playerSelection = e.target; // gets the target (class or id) of the clicked button
    playerSelection.classList.add('played'); // add a class to clicked button
    game(playerSelection.id); // play Janken with the id if the player selection
    // console.log(button.id);
    // console.log(e);

    // change the HTML Values
    player.innerHTML = playerScore;
    computer.innerHTML = computerScore;
    ties.innerHTML = tie;
    desc.innerHTML = outsideResult;

    // if (playerScore == 5 || computerScore == 5) {
    //
    //   // (playerScore > computerScore)? alert('You Win!') : alert('You Loose!');
    //   playerScore = 0;
    //   computerScore = 0;
    //   tie = 0;
    // }
  });
});

function checkScore() {
  if (playerScore == 5 || computerScore == 5) {

    (playerScore > computerScore)? alert('You Win!') : alert('You Loose!');
    playerScore = 0;
    computerScore = 0;
    tie = 0;
  }
}

function removeTransition(e) {
  // skip if it is not a removeTransition
  if(e.propertyName !== 'transform') return;
  this.classList.remove('played');
}

const btn = document.querySelectorAll('button');
btn.forEach(button => button.addEventListener('transitionend', removeTransition));
btn.forEach(button => button.addEventListener('click', checkScore));
