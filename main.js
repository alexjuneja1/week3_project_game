
// Player objects for the game.
var game = {
  player1: {
    name: "Player 1",
    score: 0
  },
  player2: {
    name: "Player 2",
    score: 0
  },
  turn: 0
}

// Function that runs when the game begins.
function playGame() {

// If statement that runs to reset all the score values.
  if(game.turn%2===0){

// Player1's turn, we're starting a new round, reset all scores back to 0
    game.player1.score = 0;
    game.player2.score = 0;
    document.querySelector('#score1').innerText = game.player1.name + "'s" + " score: " + game.player1.score;
    document.querySelector('#score2').innerText = game.player2.name + "'s" + " score: " + game.player2.score;
  }

// Displays the turn count in the console.
  console.log('turn:', game.turn);

// Clear functions for any outstanding text.
  document.querySelector('#lose').innerText = "";
  document.querySelector('#wincondition').innerText = "";
  document.querySelector('#instructions').innerText = "";
  document.querySelector('#keysused').innerText = "";
  var keys = document.querySelectorAll('.keys');
  for(i=0; i < keys.length; i++){
      keys[i].style.display = 'none';
  }
  document.removeEventListener('keypress', gameStartEvent);

// Global variables in the playGame scope.
  var counter = 7000;
  var timerInput = document.querySelector('#timer');
  var keysArray = [97,115,100,102,103,104,106,107,108];
  var validKey = keysArray[Math.floor(Math.random() * keysArray.length)];
  var timeStart = null;
  var timeTicking = null;

// Variable that displays what button needs to be pressed.
  var showPrompt = function(){
      console.log('Press', String.fromCharCode(validKey) );
      return String.fromCharCode(validKey);
  }

  var promptDisplay = document.querySelector('#prompt');

  promptDisplay.innerText = String.fromCharCode(validKey);

// Variable that creates a function to read which key you press.
  var keyEvents = function(evt){

// When you press the correct key.
      if(evt.which === validKey){
          evt.preventDefault();
          console.log('pressed key: ', String.fromCharCode(evt.which));
          console.log('awesome!');

// Creation of a new valid key.
          validKey = keysArray[Math.floor(Math.random() * keysArray.length)]
          function displayLetter(){
            promptDisplay.innerText = String.fromCharCode(validKey);
            document.getElementById("prompt").style.color = "#ccc"
          }
          displayLetter();
          window.setTimeout(revertLetter, 50);
          function revertLetter(){
            promptDisplay.innerText = String.fromCharCode(validKey);
            document.getElementById("prompt").style.color = "black";
          }
          validKey = keysArray[Math.floor(Math.random() * keysArray.length)]
          console.log('Press', String.fromCharCode(validKey) );
          if (counter >  1000){
            counter -= 1000;
          }
          console.log('counter:', counter);

// If statement that alternates turns and identifies who gets a point.
          if (game.turn%2 === 0){

// Player1's turn
            game.player1.score++;
            document.querySelector('#score1').innerText = game.player1.name + "'s" + " score: " + game.player1.score;
          } else {

// Player2's turn
            game.player2.score++;
            document.querySelector('#score2').innerText = game.player2.name + "'s" + " score: " + game.player2.score;
          }

          window.clearInterval(timeTicking);
          window.clearTimeout(timeStart);
          countDown();

// When you press the incorrect key.
      } else {
        console.log('Pressed key:', String.fromCharCode(evt.which));
        fail();
      }
  }

// Variable that runs when you press the wrong key.
  var fail = function() {
    console.log('You lose!');
    var gameOver;
    var winCondition;

// Failure and reset messages depending on what turn it is.
    if (game.turn%2===0){

// Player1 failed.
      gameOver = "Player 1 loses! Press the space-bar for Player 2's turn!";
      winCondition = "";
    } else {

// Player2 failed.
      gameOver = 'Player 2 loses! Time to round up the points...';
      if (game.player1.score > game.player2.score){
        winCondition = "Player 1 wins! Press the space bar to play again!";
      } else if (game.player1.score < game.player2.score){
        winCondition = "Player 2 wins! Press the space bar to play again!";
      } else {
        winCondition = "It's a draw! Press the space bar to play again!";
      }
    }

// What needs to happen before and when the game is reset.
    document.querySelector('#lose').innerText = gameOver;
    document.querySelector('#wincondition').innerText = winCondition;
    window.clearInterval(timeTicking);
    window.clearTimeout(timeStart);
    document.addEventListener('keypress', gameStartEvent);
    document.removeEventListener('keypress', keyEvents); //remove existing event listener
    game.turn++; // switch turn;
  }

// The timer that runs whilst you have the prompt.
  var countDown = function() {
    var timeLeft = counter;
    timeTicking = window.setInterval(function(){
      timeLeft -= 100
      timerInput.innerText = timeLeft;
      if (timeLeft == 0){
        window.clearTimeout(timeStart);
        window.clearInterval(timeTicking);
        fail();
      }
    },100)
  }

// The Event Listener that starts the function.
  document.addEventListener('keypress', keyEvents);
  console.log('The game has started!');
  countDown();
}

// The variable that allows the space-bar to start the game.
var gameStartEvent = function(evt){
    if(evt.which === 32){
        playGame();
    }
}

// The Event Listener to start the game.
document.addEventListener('keypress', gameStartEvent);
