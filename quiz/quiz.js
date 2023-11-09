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



let count = 0;
let score = 0;
const len = quizList.length;
let play = true;
const userSelectedOptns = {};

nextBtn.addEventListener("click", () => {
    if(play) {
        validateInput();
    }
   showQuiz();
})


function validateInput() {
    const userAns = document.getElementById('selected');
    if(userAns === null || userAns === undefined) {
        message("please select one option");
    }else {
        message("");
        let quizID = quizList[count].id;
        userSelectedOptns[quizID] =  userAns.innerHTML;
        if(count < len-1){
            count += 1;
            showQuiz();
        }else{
            message("game over");
            gameOver();
        }
    }
}

prevBtn.addEventListener("click", () => {
    if(count > 0) {
        count -= 1;
        showQuiz();
        showPrevOptn();
        console.log(userSelectedOptns);
    }
})

function showPrevOptn() {
    const optnList = document.querySelectorAll('.options');
    optnList.forEach(ele => {
        console.log("ele", ele.innerHTML);
        if(ele.innerHTML === userSelectedOptns[count]){
            ele.setAttribute('id', 'selected');
        }
    })
    
}


subBtn.addEventListener("click", () => {
    console.log(userSelectedOptns);
    for (const key in userSelectedOptns) {
        let userAns = userSelectedOptns[key];
        console.log(key)
        if(userAns === quizList[key].answer){
            score += 1;
            console.log("score = ", score)
        }else{
            console.log("score = ", score);
        }
    }
})



function gameOver() {
    play = false;
}

function message(msg) {
    userMessage.innerHTML = msg;
}



function selectedOption(elem) {
    elem.addEventListener("click", (optn) => {
        remPrev();
        optn.target.setAttribute('id', 'selected')
    })
}

function remPrev() {
    const optList = document.querySelectorAll('.options');
    optList.forEach(elem => elem.removeAttribute('id'))
}

function hideShowBtn() {
    const isEmpty = (Object.keys(userSelectedOptns).length === 0 && userSelectedOptns.constructor === Object);
    if(isEmpty){
        subBtn.style.visibility = 'hidden';
        prevBtn.style.visibility = 'hidden';

    }else {
        prevBtn.style.visibility = 'visible';
        subBtn.style.visibility = 'visible';

    }

}


function showQuiz() {
    console.log(count);
    console.log(userSelectedOptns);
    const optionList = document.querySelector('.option_list');
    optionList.innerHTML = '';
    const qs = document.querySelector('.question');
    qs.innerHTML = `<h2> ${quizList[count].question} </h2>`;

    const optionArr = quizList[count].options;

   optionArr.forEach((option) => {
    let optnDiv = document.createElement('div');
    optnDiv.classList.add('options');
    optnDiv.innerHTML = option;
    optionList.appendChild(optnDiv);
   })
   hideShowBtn();
document.querySelectorAll('.options').forEach((option) => selectedOption(option))
}



showQuiz();
hideShowBtn();
