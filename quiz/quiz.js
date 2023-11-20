import data from './api.js';
// const data = "abc"
console.log(data[0]);

const container = document.querySelector('.container');
const tasks = document.querySelector('.task');
// const prevBtn = document.getElementById('prev');
// const nextBtn = document.getElementById('next');
// const submitBtn = document.getElementById('submit');
// const userMessage = document.getElementById('msg');
// // const listDiv = document.querySelector('.list');
// const number = document.getElementById('number');
// const quesNumQueue = document.querySelector('.disp_num');
// const timer = document.querySelector('.timer');

const questionDiv = document.querySelector('.question');
const optionsDiv = document.querySelector('.option_list');
const box = document.querySelector('.box');
const startQuiz = document.querySelector('.start_quiz');
const startButton = document.getElementById('start_quiz_button');
const timer = document.querySelector('.timer');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const submitButton = document.getElementById('submit');
const gameOverDiv = document.querySelector('.game_over');
const reStartQuiz = document.getElementById('retake_quiz');
const myScore = document.getElementById('myscore');
const questionNumbers = document.querySelector('.question_numbers')

let countIndex = 0;
let userSelectedOptns = {};
let quizQuestions;

startGame();

async function quizApi() {
    const response = await fetch('https://annu1245.github.io/quiz-api/data.json')
    quizQuestions = await response.json();
    console.log("data", data);
}


function startGame() {
    box.style.display = 'none';
    gameOverDiv.style.display = 'none';
    container.setAttribute('id', 'center');
    quizApi();
}

startButton.addEventListener("click", () => {
    container.removeAttribute('id');
    startQuiz.style.display = 'none';
    box.style.display = 'block';
    startTimer();
    quesNumbers();
    checkNextQuiz();
})



// quizApi();

nextButton.addEventListener("click", () => {
    checkNextQuiz();
})

previousButton.addEventListener("click", ()=>{
    if(countIndex > 1) {
        countIndex--;
        clearPreviousElement();
        displayQuiz(quizQuestions[countIndex-1]);
    }
})

function checkNextQuiz() {
    if(countIndex < quizQuestions.length) {
        countIndex++;
        console.log(countIndex);
        clearPreviousElement();
        displayQuiz(quizQuestions[countIndex-1]);
    }else {
        console.log("no more quiz");
    }
}

function showPreviousButton() {
    if(countIndex === 1 || countIndex === 0) {
        previousButton.style.visibility = 'hidden';
    }else {
        previousButton.style.visibility = 'visible';
    }
}

function displayQuiz(currentData) {
    console.log("cc", countIndex);
    showPreviousButton();
    questionDiv.innerHTML = `Q${countIndex} ${currentData.question}`
    currentData.options.map((optionValue) => {
        let optionList = document.createElement('li');
        optionList.classList.add('options');
        optionList.innerHTML = optionValue;
        optionsDiv.appendChild(optionList);
    })
    previousSelectedOtpn();
    selectOptionListener();
}

function clearPreviousElement() {
    questionDiv.innerHTML = '';
    optionsDiv.innerHTML = '';
}

function selectOptionListener() {
    // Check if previously answerd
    // previousSelectedOtpn();
    let optnArr = document.querySelectorAll('.options');
    optnArr.forEach((optn) => {
        optn.addEventListener('click', ()=>{
            //remove previous selected
            optnArr.forEach(otherOpn => {
                otherOpn.removeAttribute('id');
            });
            //select new option
            optn.setAttribute('id', 'selected');
            setUserAnswer(optn.innerHTML);
        })
    })
}


function setUserAnswer(value) {
    userSelectedOptns[countIndex] = value;
    // update question number queue
    updateQuestionNumQueue();
   
}

function previousSelectedOtpn() {
    let allOptn = document.querySelectorAll('.options');
    if(userSelectedOptns[countIndex] != undefined) {
        allOptn.forEach(optn => {
            if(optn.innerHTML === userSelectedOptns[countIndex]){
                optn.setAttribute('id', 'selected');
            }
        })
    }
}

let totalScore = 0;

function calculateTotalScore() {
    let score = 0;
    for(const key in userSelectedOptns){
        let apiObj = quizQuestions[key-1];
        console.log(apiObj);
        if(userSelectedOptns[key] === apiObj.answer){
            score++;
        }
    }
    return score;
}

submitButton.addEventListener("click", () => {
    totalScore = calculateTotalScore();
    box.style.display = 'none';
    container.setAttribute('id', 'center');  
    myScore.innerHTML = `${totalScore}`;
    gameOverDiv.style.display = 'block';
})

reStartQuiz.addEventListener("click", () => {
    console.log("yes");
    container.removeAttribute('id');
    gameOverDiv.style.display = 'none';
    countIndex = 0;
    userSelectedOptns = {};
    box.style.display = 'block';
    checkNextQuiz();
})


// // Game restart Button
// const rePlay = document.createElement('button');


// let countIndex = 0;
// let quizList;


// quizApi();
// // show all question number in a queue to the top of page
function quesNumbers() {
    for(let i=1; i<=quizQuestions.length; i++) {
        let quesNum = document.createElement('span');
        quesNum.classList.add('ques_num_queue');
        quesNum.innerHTML = i;
        questionNumbers.appendChild(quesNum);
        // quesNumListener(quesNum);
    }
    questionNumberListener();
}

function questionNumberListener() {
    let allQuesNumArr = document.querySelectorAll('.ques_num_queue');
    allQuesNumArr.forEach((questionNumber) => {
        questionNumber.addEventListener("click", (e) => {
            //remove previous active
            allQuesNumArr.forEach(otherNumber => otherNumber.removeAttribute('id'));
            countIndex = parseInt(e.target.innerHTML);
            //set new to active
            e.target.setAttribute('id', 'current');
            clearPreviousElement();
            displayQuiz(quizQuestions[countIndex-1])
        })
    })
}



function quesNumListener(currQuesNumDiv) {
    currQuesNumDiv.addEventListener('click', () => {
        let currQuesNum = parseInt(currQuesNumDiv.innerHTML);
        let obj = quizList[currQuesNum-1];
        countIndex = currQuesNum;
        listDiv.innerHTML = '';
        displayQuiz(obj);
    })
}





// function checkNextQuiz() {
//     console.log("yes", countIndex);
//     if(countIndex < quizList.length) {
//         const currentData = quizList[countIndex];
//         countIndex++;
//         displayQuiz(currentData);
//     }else {
//         message("No more quiz.. Click on Submit")
//     }
// }





function updateQuestionNumQueue() {
    let userSelectedQuesNum = Object.keys(userSelectedOptns);
    let quesNumberQueue = document.querySelectorAll('.ques_num_queue');
    quesNumberQueue.forEach(quesNumber => {
        if(userSelectedQuesNum.includes(quesNumber.innerHTML)) {
            quesNumber.style.backgroundColor = 'tomato';
        }
    })
}





// function showFooterButton() {
//     submitBtn.style.visibility = 'visible';
//     if(countIndex === 1) {
//         prevBtn.style.visibility = 'hidden';
//     }else{
//         prevBtn.style.visibility = 'visible';
//     }
// }





// rePlay.addEventListener("click", () => {
//     countIndex = 0;
//     totalScore = 0;
//     userSelectedOptns = {};
//     listDiv.innerHTML = '';
//     number.style.display = 'block';
//     checkNextQuiz();
// })

function startTimer() {
    let time = 300; // 5 minutes in seconds
    const timerElement = document.getElementById('timer');

    const timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        // Add leading zero to seconds less than 10
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Update the timer display
        timer.innerHTML = `${minutes}:${seconds}`;
        if (time === 0) {
        // Display a message when the timer reaches 0
        clearInterval(timerInterval);
        timer.innerHTML = 'Time is over!';
        submitButton.click();
        } else {
        time--; // Decrease the time by 1 second
        }
    }, 1000); // Update every second
}



// // window.onload = function () {
// //     quesNumbers();
// //     checkNextQuiz();
// //     prevBtn.style.visibility = 'hidden';
// //     submitBtn.style.visibility = 'hidden';
// // }