var counter = 10000;
var keysArray = [113,119,101,97,115,100,122,120,99];
var validKey = keysArray[Math.round(Math.random() * keysArray.length)]
//get a random key code from the array:
//keysArray[Math.round(Math.random() * keysArray.length)]
var showPrompt = function(){
    console.log('Press', String.fromCharCode(validKey) );
    return String.fromCharCode(validKey);
}
var promptDisplay = document.querySelector('#prompt');

//promptDisplay.innerText = showPrompt
promptDisplay.innerText = String.fromCharCode(validKey);

var keyEvents = function(evt){
    if(evt.which === validKey){
      // THIS RUNS WHEN PLAYER HITS CORRECT KEY
        evt.preventDefault();
        countDown();
        console.log('awesome!');
        validKey = keysArray[Math.round(Math.random() * keysArray.length)]
        promptDisplay.innerText = String.fromCharCode(validKey);
        console.log('Press', String.fromCharCode(validKey) );
        if (counter > 2000){
          counter -= 1000;
        }
        console.log(counter);
    } else {
      // THIS RUNS WHEN PLAYER HITS INCORRECT KEY
      // evt.preventDefault();
      // console.log('faillll!');
      // document.removeEventListener('keypress', keyEvents);
      fail();
    }
}

var fail = function() {
  console.log('faillll!');
  document.removeEventListener('keypress', keyEvents);
}

var countDown = function() {
  window.setTimeout(fail, counter)
}

document.addEventListener('keypress', keyEvents);
//    document.addEventListener('keypress', function(evt){
//        console.log(evt.keyCode)
//    });
