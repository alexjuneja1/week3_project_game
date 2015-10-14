
// Player objects for the game.
var game = {
  player1: {
    name: "Player 1",
    score: 0
  },
  player2: {
    name: "Player 2",
    score: 0
  }
}

// Function that runs when the game begins.
function playGame() {

// Clear functions for any outstanding text.
  document.removeEventListener("keypress", gameStartEvent);
  document.querySelector('#lose').innerText = "";

// Global variables in the playGame scope.
  var score = 0;
  var gameOver = "You lose! Game Over!";
  var counter = 7000;
  var timerInput = document.querySelector('#timer');
  var keysArray = [113,119,101,97,115,100,122,120,99];
  var validKey = keysArray[Math.round(Math.random() * keysArray.length)];
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
          console.log(evt.which)
          console.log('awesome!');
          validKey = keysArray[Math.round(Math.random() * keysArray.length)]
          promptDisplay.innerText = String.fromCharCode(validKey);
          console.log('Press', String.fromCharCode(validKey) );
          if (counter >  1000){
            counter -= 1000;
          }
          console.log(counter);
          game.turn = game.player1;
          game.turn.score++;
          document.querySelector('#score1').innerText = game.turn.name + "'s" + " score: " + game.turn.score;
          window.clearInterval(timeTicking);
          window.clearTimeout(timeStart);
          countDown();

// When you press the incorrect key.
      } else {
        console.log(evt.which)
        fail();
        document.addEventListener('keypress', gameStartEvent);
      }
  }

// Variable that runs when you press the wrong key.
  var fail = function() {
    console.log('You lose! Game over!');
    document.querySelector('#lose').innerText = gameOver;
    window.clearInterval(timeTicking);
    window.clearTimeout(timeStart);
    document.removeEventListener('keypress', keyEvents);
  }

// The timer that runs whilst you have the prompt.
  var countDown = function() {
    var timeLeft = counter;
    timeStart = window.setTimeout(fail, counter);
    timeTicking = window.setInterval(function(){
      timeLeft -= 100
      timerInput.innerText = timeLeft;
      if (timeLeft == 0){
        window.clearTimeout(timeStart);
        window.clearInterval(timeTicking);
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

var gameReset = function(evt){

}

// The Event Listener to start the game.
document.addEventListener('keypress', gameStartEvent);
