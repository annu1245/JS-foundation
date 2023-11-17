import data from './api.js';
// const data = "abc"
console.log(data[0]);
const quizList = data;

const container = document.querySelector('.container');
const tasks = document.querySelector('.task');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const subBtn = document.getElementById('submit');
const userMessage = document.getElementById('msg');
const listDiv = document.querySelector('.list');
const number = document.getElementById('number');
const dispNumDiv = document.querySelector('.disp_num');


let count = 0;
let countIndex = 0;
const len = quizList.length;
let play = true;
const userSelectedOptns = {};



function displayQueue () {
    for(let i=1; i<=quizList.length; i++) {
        let sp = document.createElement('span');
        sp.innerHTML = i;
        dispNumDiv.appendChild(sp);
        quizListener(sp);
    }
}

function quizListener(spanElem) {
    spanElem.addEventListener('click', () => {
        let quizNum = parseInt(spanElem.innerHTML);
        let obj = quizList[quizNum-1];
        countIndex = quizNum;
        listDiv.innerHTML = '';
        showBtn();
        displayQuiz(obj);
    })
}

nextBtn.addEventListener("click", () => {
    userMessage.innerHTML = '';
    listDiv.innerHTML = '';
    showNextQuiz();
    showBtn();
})


function showNextQuiz() {
    if(countIndex < quizList.length) {
        const currentData = quizList[countIndex];
        countIndex++;
        displayQuiz(currentData);
    }else {
        message("No more quiz.. Click on Submit")
    }
}

function displayQuiz(currData, count = countIndex) {
    number.innerHTML = `${count}`
    let quesDiv = document.createElement('div');
    quesDiv.classList.add('question');
    quesDiv.innerHTML = currData.question;

    let multiOptnDiv = document.createElement('div');
    multiOptnDiv.classList.add('optin_list');

    currData.options.map((optn) => {
        let opList = document.createElement('li');
        opList.classList.add('options');
        opList.innerHTML = optn;
        multiOptnDiv.appendChild(opList);
    })

    listDiv.appendChild(quesDiv);
    listDiv.appendChild(multiOptnDiv);

    selectedOption();
}

function selectedOption() {
    let optnArr = document.querySelectorAll('.options');
    optnArr.forEach((optn) => {
        optn.addEventListener('click', ()=>{
            //remove previous selected
            optnArr.forEach(otherOpn => {
                otherOpn.removeAttribute('id');
            });
            //select new one
            optn.setAttribute('id', 'selected');
            userSelectedOptns[countIndex] = optn.innerHTML;
            console.log(userSelectedOptns);
        })
    })
}



prevBtn.addEventListener("click", ()=>{
    listDiv.innerHTML = '';
    if(countIndex > 1) {
        countIndex--;
        if(countIndex === 1) {
            prevBtn.style.visibility = 'hidden';
        }else {
            prevBtn.style.visibility = 'visible';
        }
        displayQuiz(quizList[countIndex-1]);
    }
    
})


function showBtn() {
    subBtn.style.visibility = 'visible';
    if(countIndex === 1) {
        prevBtn.style.visibility = 'hidden';
    }else{
        prevBtn.style.visibility = 'visible';
    }
}



window.onload = function () {
    displayQueue();
    showNextQuiz();
    console.log("onload", countIndex);
    prevBtn.style.visibility = 'hidden';
    subBtn.style.visibility = 'hidden';
}