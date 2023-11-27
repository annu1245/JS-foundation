const container = document.querySelector('.container');
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
const progressBar = document.querySelector('progress_bar');
const down = document.querySelector('.down');
const element = document.querySelector(".pagination ul");


// const questionNumbers = document.querySelector('.question_numbers')

let countIndex = 0;
let totalScore = 0;
let userSelectedOptns = {};
let quizQuestions;
let timerInterval;
let totalPages = 10;
let page = 1;
let play = true;

if(play) {
  startGame();
}


async function quizApi() {
    const response = await fetch('https://annu1245.github.io/quiz-api/data.json')
    quizQuestions = await response.json();
}

// This startGame function will fetching api
function startGame() {
    box.style.display = 'none';
    gameOverDiv.style.display = 'none';
    container.setAttribute('id', 'center');
    quizApi();
}

// This is a start button which start the game and set the timer
startButton.addEventListener("click", () => {
    container.removeAttribute('id');
    startQuiz.style.display = 'none';
    box.style.display = 'block';
    startTimer();
    checkNextQuiz();
})

// this will check for the next quiz
nextButton.addEventListener("click", () => {
    checkNextQuiz();
})

// this will check the previous quiz when user clicks on previous button
previousButton.addEventListener("click", ()=>{
    if(countIndex > 1) {
        countIndex--;
        clearPreviousElement();
        displayQuiz(quizQuestions[countIndex-1]);
        element.innerHTML =  createPagination(10, countIndex);
    }
})

// this will terminate the game and call show the result
submitButton.addEventListener("click", () => {
  clearInterval(timerInterval);
    totalScore = calculateTotalScore();
    box.style.display = 'none';
    container.setAttribute('id', 'center'); 
    gameOverDiv.style.display = 'block';
    myScore.innerHTML = `${totalScore * 10} %`;
    let resultText;
    if(totalScore < 7) {
      resultText = `<p style="color:red ;">oppss you are Failed !!<p>
                    <p> Better luck next time... </P>`
    }else if(totalScore >= 7){
      resultText = `<p style="color:green ;">Congratulationss !!!!<p>
                    <p> You passed the Test </P>`
    }
   down.insertAdjacentHTML('afterbegin', resultText);
})

// This button is click to restart the quiz once result is displayed
reStartQuiz.addEventListener("click", () => {
    console.log("yes");
    container.removeAttribute('id');
    gameOverDiv.style.display = 'none';
    countIndex = 0;
    userSelectedOptns = {};
    box.style.display = 'block';
    startButton.click();
})

// This function is called when user clicks on next button this will check for the next quiz
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

// This function will hide the previous button when user is on 1st quiz count
function showPreviousButton() {
    if(countIndex === 1 || countIndex === 0) {
        previousButton.style.visibility = 'hidden';
    }else {
        previousButton.style.visibility = 'visible';
    }
}

// This function will dynamically create the quiz content by taking the count of quiz question
function displayQuiz(currentData) {
    if(currentData === undefined || currentData == {}) {
        return;
    }    
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

// This function is used to clear the already existing question on the html page
function clearPreviousElement() {
    questionDiv.innerHTML = '';
    optionsDiv.innerHTML = '';
}

// This will add listener on the options of question
function selectOptionListener() {
    // Check if previously answerd
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

//this will update the object wich is used to store the answers of user
function setUserAnswer(value) {
    userSelectedOptns[countIndex] = value;
    // update question number queue   
}

// This function is used to check whether the user already select the options displayd in the page 
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

// This will the show the score percent on the progressbar
function runProgressBar(percent) {
  if(percent == 0) {
    document.querySelector(".circular-progress").style.background = `
    conic-gradient(#FF0000 0deg, #fff 0deg)`;
    return
  }else {

  let progressStartValue = 0;
  let progressStartEnd = `${percent}`
  let speed = 10;
  let color = 'cyan';

  let progessTimer = setInterval(() => {
    progressStartValue++;
    if (progressStartValue == progressStartEnd) {
      clearInterval(progessTimer);
    }
    
    document.querySelector(".circular-progress").style.background = `
    conic-gradient(${color} ${3.6 * progressStartValue}deg, #fff 0deg)`;

    document.querySelector(".course-value").innerHTML = progressStartValue + "%";
  },speed);
}
}

// This function is used to calculate the total score
function calculateTotalScore() {
    let score = 0;
    for(const key in userSelectedOptns){
        let apiObj = quizQuestions[key-1];
        console.log(apiObj);
        if(userSelectedOptns[key] === apiObj.answer){
            score++;
        }
    }

    runProgressBar(score * 10)
    return score;
}

// Timer function
function startTimer() {
    let time = 300; // 5 minutes in seconds
    timer.innerHTML = `5:00`;
    const timerElement = document.getElementById('timer');

        timerInterval = setInterval(() => {
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

