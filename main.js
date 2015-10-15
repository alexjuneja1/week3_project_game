
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

console.log('turn:', game.turn);
// Clear functions for any outstanding text.
  document.querySelector('#lose').innerText = "";

// Global variables in the playGame scope.
  var gameOver = "You lose!";
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
          console.log('pressed key: ', String.fromCharCode(evt.which));
          console.log('awesome!');

          // Make new valid key
          validKey = keysArray[Math.round(Math.random() * keysArray.length)]
          promptDisplay.innerText = String.fromCharCode(validKey);
          console.log('Press', String.fromCharCode(validKey) );
          if (counter >  1000){
            counter -= 1000;
          }
          console.log('counter:', counter);

          if (game.turn%2 === 0){
            //player1's turn
            game.player1.score++;
            document.querySelector('#score1').innerText = game.player1.name + "'s" + " score: " + game.player1.score;
          } else {
            //player2's turn
            game.player2.score++;
            document.querySelector('#score2').innerText = game.player2.name + "'s" + " score: " + game.player2.score;
          }

          //switch turn;
          //game.turn++;

          // game.turn.score++
          // if(game.turn == game.player2){
          //
          // } else if(game.turn == game.player1){
          //
          // }
          window.clearInterval(timeTicking);
          window.clearTimeout(timeStart);
          countDown();

// When you press the incorrect key.
      } else if(evt.which !== 32) {
        console.log('Pressed key:', String.fromCharCode(evt.which));
        fail();
      }
  }

// Variable that runs when you press the wrong key.
  var fail = function() {
    console.log('You lose!');
    document.querySelector('#lose').innerText = gameOver;
    window.clearInterval(timeTicking);
    window.clearTimeout(timeStart);

    document.removeEventListener('keypress', keyEvents); //remove existing event listener
    game.turn++; // switch turn;
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

// The Event Listener to start the game.
document.addEventListener('keypress', gameStartEvent);
