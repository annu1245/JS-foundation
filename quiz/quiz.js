import data from './api.js';
// const data = "abc"
console.log(data[0]);
const quizList = data;

const container = document.querySelector('.container');
const nextBtn = document.getElementById('next_btn');


let count = 0;
const score = 0;
const len = quizList.length;
nextBtn.addEventListener("click", () => {
    if(count > len){
        console.log("game over");
        return;
    }else {
        count += 1;
        showQuiz();
    }
})


function selectedOption(elem) {
    console.log("yes");
    // elem.removeAttribute('id', 'selected');

    elem.addEventListener("click", (optn) => {
        remPrev();
        optn.target.setAttribute('id', 'selected')

    })
}

function remPrev() {
    const optList = document.querySelectorAll('.options');
    optList.forEach((elem) => {
        elem.removeAttribute('id');
    })
}


function showQuiz() {
    const qs = document.querySelector('.question');
    qs.innerHTML = `<h2> ${quizList[count].question} </h2>`;

    const optionList = document.querySelector('.option_list');
    const optionArr = quizList[count].options;

   optionArr.forEach((option) => {
    let optnDiv = document.createElement('div');
    optnDiv.classList.add('options');
    optnDiv.innerHTML = option;
    optionList.appendChild(optnDiv);
   })
document.querySelectorAll('.options').forEach((option) => selectedOption(option))
    
}


showQuiz();