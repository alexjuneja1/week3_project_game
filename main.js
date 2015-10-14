function playGame() {
  var score = 0;
  var counter = 7000;
  var timerInput = document.querySelector('#timer');
  var keysArray = [113,119,101,97,115,100,122,120,99];
  var validKey = keysArray[Math.round(Math.random() * keysArray.length)]

  var showPrompt = function(){
      console.log('Press', String.fromCharCode(validKey) );
      return String.fromCharCode(validKey);
  }
  var promptDisplay = document.querySelector('#prompt');

  promptDisplay.innerText = String.fromCharCode(validKey);

  var keyEvents = function(evt){
      if(evt.which === validKey){
          evt.preventDefault();
          console.log('awesome!');
          validKey = keysArray[Math.round(Math.random() * keysArray.length)]
          promptDisplay.innerText = String.fromCharCode(validKey);
          console.log('Press', String.fromCharCode(validKey) );
          if (counter >  1000){
            counter -= 1000;
          }
          console.log(counter);
          score++;
          console.log("Score"+": "+score);
          document.querySelector('#score').innerText = score;
          countDown();
      } else {
        fail();
      }
  }

  var fail = function() {
    console.log('faillll!');
    document.removeEventListener('keypress', keyEvents);
  }

  var countDown = function() {
    window.clearInterval(timeTicking);
    window.clearTimeout(timeStart);
    var timeLeft = counter;
    var timeStart = window.setTimeout(fail, counter);
    var timeTicking = window.setInterval(function(){
      timeLeft -= 100
      timerInput.innerText = timeLeft;
      if (timeLeft == 0){
        window.clearTimeout(timeStart);
        window.clearInterval(timeTicking);
      }
    },100)
  }

  document.addEventListener('keypress', keyEvents);
  console.log('The game has started!');
  countDown();
}

var gameStartEvent = function(evt){
    if(evt.which === 32){
        playGame();
    }
}

document.addEventListener('keypress', gameStartEvent);
