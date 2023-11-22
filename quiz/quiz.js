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
// const questionNumbers = document.querySelector('.question_numbers')

let countIndex = 0;
let userSelectedOptns = {};
let quizQuestions;

const element = document.querySelector(".pagination ul");
let totalPages = 10;
let page = 1;

startGame();

async function quizApi() {
    const response = await fetch('https://annu1245.github.io/quiz-api/data.json')
    quizQuestions = await response.json();
}


function startGame() {
    box.style.display = 'none';
    gameOverDiv.style.display = 'none';
    container.setAttribute('id', 'center');
    quizApi();
}

let cc = 10;
let p = 3
startButton.addEventListener("click", () => {
    container.removeAttribute('id');
    startQuiz.style.display = 'none';
    box.style.display = 'block';
    startTimer();
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
        element.innerHTML =  createPagination(10, countIndex);
    }
})

function checkNextQuiz() {
    if(countIndex < quizQuestions.length) {
        countIndex++;
        console.log(countIndex);
        clearPreviousElement();
        displayQuiz(quizQuestions[countIndex-1]);
        element.innerHTML =  createPagination(10, countIndex);
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
    if(currentData === undefined || currentData == {}) {
        return;
    }
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
// function quesNumbers() {
//     for(let i=1; i<=quizQuestions.length; i++) {
//         let quesNum = document.createElement('span');
//         quesNum.classList.add('ques_num_queue');
//         quesNum.innerHTML = i;
//         questionNumbers.appendChild(quesNum);
//         // quesNumListener(quesNum);
//     }
//     questionNumberListener();
// }

// function questionNumberListener() {
//     let allQuesNumArr = document.querySelectorAll('.ques_num_queue');
//     allQuesNumArr.forEach((questionNumber) => {
//         questionNumber.addEventListener("click", (e) => {
//             //remove previous active
//             allQuesNumArr.forEach(otherNumber => otherNumber.removeAttribute('id'));
//             countIndex = parseInt(e.target.innerHTML);
//             //set new to active
//             e.target.setAttribute('id', 'current');
//             clearPreviousElement();
//             displayQuiz(quizQuestions[countIndex-1])
//         })
//     })
// }



// function quesNumListener(currQuesNumDiv) {
//     currQuesNumDiv.addEventListener('click', () => {
//         let currQuesNum = parseInt(currQuesNumDiv.innerHTML);
//         let obj = quizList[currQuesNum-1];
//         countIndex = currQuesNum;
//         listDiv.innerHTML = '';
//         displayQuiz(obj);
//     })
// }





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





// function updateQuestionNumQueue() {
//     let userSelectedQuesNum = Object.keys(userSelectedOptns);
//     let quesNumberQueue = document.querySelectorAll('.ques_num_queue');
//     quesNumberQueue.forEach(quesNumber => {
//         if(userSelectedQuesNum.includes(quesNumber.innerHTML)) {
//             quesNumber.style.backgroundColor = 'tomato';
//         }
//     })
// }





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


//pagination 
// selecting required element

element.innerHTML = createPagination(totalPages = 10, page);
//calling function with passing parameters and adding inside element which is ul tag
function createPagination(totalPages, page){


console.log("page", page);

  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if(page > 1){ //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if(page > 2){ //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) { //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if(page == plength){ //if page is equal to plength than assign active string in the active variable
      active = "active";
    }else{ //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
    if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1})"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }

  
  if(quizQuestions != undefined){
    countIndex = page;
    clearPreviousElement();
    displayQuiz(quizQuestions[countIndex-1])
    
  }
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}

