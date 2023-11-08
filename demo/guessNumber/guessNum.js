const form = document.querySelector('form');
const userNum = document.getElementById('number');
const prevNum = document.getElementById('prev_guess');
const remGuess = document.getElementById('rem_guess');
const userMessage = document.getElementById('user_message');
const gameInfo = document.getElementById('gameInfo');

const p = document.createElement('p');
p.classList.add('newGame');

let randomNum = parseInt(Math.random() * 50 + 1);
let prevGuess = [];
let playGame = true;
let attempt = 1;
console.log(randomNum);

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let guess = parseInt(userNum.value);
    if(playGame) {
        validateNumber(guess);
    }
})

function validateNumber(guess) {
    if(guess === '' || guess < 0 || guess > 50 || isNaN(guess)) {
        message("please enter a valid Number")
    }else {
        prevGuess.push(guess);
        if(attempt === 11){
            displayGuess(guess);  
            message(`game over. Random number was ${randomNum}`);
            endGame();
        }else {
            displayGuess(guess);
            checkRange(guess);
        }
    }
}

function checkRange(guess) {
    if(guess === randomNum) {
        message("You won the game");
        endGame();
    }else if(guess < randomNum){
        message("your number is tooo low");
    }else if(guess > randomNum) {
        message("your number is too large")
    }
}

function  displayGuess(guess) {
    userNum.value = '';
    prevNum.innerHTML += `${guess}, `;
    attempt++;
    remGuess.innerHTML = `${11 - attempt}`;
}

function message(msg) {
    userMessage.innerHTML = msg;
}

function startGame() {
    const newGameBtn = document.getElementById('newGame');
    newGameBtn.addEventListener("click", () => {
        randomNum = parseInt(Math.random() * 50 + 1);
        prevGuess = [];
        attempt = 1;
        prevNum.innerHTML = '';
        userMessage = '';
        remGuess.innerHTML = `${11 - attempt}`;
        userNum.removeAttribute('disabled');
        gameInfo.removeChild(p);
        playGame = true;
    })
}

function endGame() {
    userNum.value = '';
    userNum.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    gameInfo.appendChild(p);
    playGame = false;
    startGame();
}