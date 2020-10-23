

// Challenge 1: Your Age in Days 
ageInDays=()=> {
  
  var birthYear =prompt('What year were you born?'); 
  if (birthYear==''){
    birthYear =prompt('Sorry :( What year were you born again?'); 
  }else{
    console.log(birthYear);
    var ageInDays = (2020-birthYear)*365; 
    var h1 = document.createElement('h1'); 
    var textAnswer = document.createTextNode('You are ' + ageInDays + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
  }
}

reset=()=> {
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Meme Generator
generateCat=()=>{
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src ="http://thecatapi.com/api/images/get?format=src&type=gif&size-tiny";
    div.appendChild(image);
 
}

// Challenge 3: Rock Paper Scrissors

rpsGame = (yourChoice)=>{
    var humanChoice, botChoice; 
    humanChoice= yourChoice.id;
    botChoice = numberToChoice(randomNum(3));
    console.log('Computer choice:',botChoice);

    results = decideWinner(humanChoice, botChoice);
    
    console.log("results: ",results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

randomNum=(number)=>{
    return Math.floor(Math.random()*number);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock':{'scissors':1, 'rock': 0.5, 'paper':0},
        'paper':{'rock':1, 'paper': 0.5, 'scissors':0},
        'scissors':{'paper':1, 'scissors': 0.5, 'rock':0}
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice]
    console.log("human: ",yourScore);

    var computerScore = rpsDatabase[computerChoice][yourChoice]
    console.log("human: ",computerScore);

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'you tied', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src, 
        'paper':document.getElementById('paper').src, 
        'scissors':document.getElementById('scissors').src, 
    } 

    // let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove(); 
    document.getElementById('scissors').remove(); 
                                                                                                             
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height = 150 width=150 style ='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>'"
    messageDiv.innerHTML= "<h1 style = 'color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height = 150 width=150 style ='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>'"
    document.getElementById('flex-box-rps-img').appendChild(humanDiv);
    

    document.getElementById('flex-box-rps-img').appendChild(messageDiv);
    document.getElementById('flex-box-rps-img').appendChild(botDiv);
}



// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i = 0; i< all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    }
    else if (buttonThingy.value === 'green'){
        buttonsGreen();
    }
    else if (buttonThingy.value === 'reset'){
        buttonColorReset();
    }
    else if (buttonThingy.value === 'random'){
        randomColors();
    }
}

buttonsRed=()=> {
    for (let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
buttonsGreen=()=> {
    for (let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
buttonColorReset=()=> {
    for (let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
randomColors=()=> {
    var choices = ['btn-primary','btn-danger', 'btn-success', 'btn-warning']
    for (let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNum(4)]);
    }
}









//TITLE: Challenge 5: Blackjack

let blackJackGame={
  'you': {'scoreSpan': '#your-blackjack-result', 'div':'#your-box','score':0},
  'dealer' : {'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box', 'score':0}, 
  'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'], 
  'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11]},
  'wins': 0,
  'losses':0,
  'draws':0,
  'isStand':false,
  'turnsOver': false,
};

const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']
// C:\Users\Diego\Desktop\BlackJack\static\sounds\aww.mp3s
//static\sounds\aww.mp3
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-btn').addEventListener('click',blackJackDeal);

function blackjackHit() {
  if (blackJackGame['isStand'] === false){
    let card = getRandomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic() {
  blackJackGame['isStand']=true;

  while(DEALER['score'] < 15 && blackJackGame['isStand']===true){
    let card = getRandomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(600);
  }

  blackJackGame['turnsOver'] =true;
  let winner = computeWinner();
  showResult(winner);

}

function showCard(card,activePlayer){
  if (activePlayer['score'] <=21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackJackDeal(){
  if (blackJackGame['turnsOver']===true){

    blackJackGame['isStand']=false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for ( i =0; i<yourImages.length; i++){
      yourImages[i].remove();
    }

    for ( i =0; i<dealerImages.length; i++){
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] =0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff'
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff'

    
    document.querySelector('#blackjack-result').textContent="Let's play";
    document.querySelector('#blackjack-result').style.color='black';

    blackJackGame['turnsOver'] = true;

  }
}

function getRandomCard() {
  return blackJackGame['cards'][randomNum(13)];
}

function updateScore(card, activePlayer) {

  if (card ==='A'){
    //if adding 11<21, add 11 otherwise, add 1
    if(activePlayer['score'] + blackJackGame['cardsMap'][card][1] <=21) {
      activePlayer['score'] += blackJackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackJackGame['cardsMap'][card][0];
    }
  }else{
    activePlayer['score'] += blackJackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

//compute winner and return who won
// also updates the wins, draws, and losses
function computeWinner() {
  let winner;

  if (YOU['score'] <=21) {
    // cond: higher score than dealer or when dealer busts but you're 2
    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
      console.log('You won!');
      blackJackGame['wins']++;
      winner = YOU;

    }else if (YOU['score'] < DEALER['score']) {
      console.log('You lost!');
      blackJackGame['losses']++;
      winner = DEALER;
    }else if(YOU['score'] === DEALER['score']) {
      blackJackGame['draws']++;
      console.log('You drew!');
    }

    //cond: when user busts but dealer doesn't 
  }else if(YOU['score'] >21 && DEALER['score']<=21){
    blackJackGame['losses']++;
    console.log('You lost!');
    winner=DEALER;

  //cond: when you and the dealer busts
  }else if (YOU['score'] > 21 && DEALER['score'] > 21){
    blackJackGame['draws']++;
    console.log('You drew!');
  }
  console.log('Winner is', winner);
  return winner
} 

function showResult(winner){
  let message, messageColor;

  if (blackJackGame['turnsOver'] === true){

    
    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackJackGame['wins'];
      message = 'You won!';
      messageColor = 'green';
      winSound.play();
    } else if (winner ===DEALER) {
      document.querySelector('#losses').textContent = blackJackGame['losses'];
      message = 'You lost!';
      messageColor = 'red';
      lossSound.play();
    } else{
      document.querySelector('#draws').textContent = blackJackGame['draws'];
      message = 'You drew!';
      messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message; 
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}
