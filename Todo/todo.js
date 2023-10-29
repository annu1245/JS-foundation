submintBtn = document.getElementById("submit");
listDiv = document.querySelector("#list");
text = document.querySelector('input');
testbtn = document.getElementById('test');
clearBtn = document.getElementById('clear_btn');

submintBtn.addEventListener("click", function() {
    input_val = text.value.trim();
    if(input_val != '') {
        addDiv(input_val);
        setLocal(input_val);
        removeDiv();
        textStripe();
        text.value = '';
    } 
    else {
        alert("please write your todo");
    }
})

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    alert("all cleared");
    location.reload();
})

function setLocal(data) {
    let myTodoData = JSON.parse(localStorage.getItem("mytodo")) || [];
    myTodoData.push(data);
    localStorage.setItem("mytodo", JSON.stringify(myTodoData));
}

function getLocal() {
    var myTodoData = JSON.parse(localStorage.getItem("mytodo")) || [];
    if(myTodoData.length < 0){
        return;
    }else {
        myTodoData.forEach((item)=>{
            console.log("item" + item);
            addDiv(item);
        })
    }
}


function addDiv(input_val) {
    elemDiv = document.createElement('div');
    elemDiv.classList.add('elem', 'new-box');

    textDiv = document.createElement('spam');
    textDiv.classList.add('text');
    textDiv.innerText = input_val;

    icon1 = document.createElement('spam');
    icon1.classList.add('icon1');
    icon1.innerHTML = '<i class="fa-regular fa-circle-check"></i>';

    icon2 = document.createElement('spam');
    icon2.classList.add('icon2');
    icon2.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    elemDiv.appendChild(textDiv);
    elemDiv.appendChild(icon1);
    elemDiv.appendChild(icon2);
    listDiv.appendChild(elemDiv);

    setTimeout(() => {
        elemDiv.classList.remove('new-box');
    }, 300)
}

function removeDiv() {
    let myTodoData = JSON.parse(localStorage.getItem("mytodo")) || [];
    document.querySelectorAll('.icon2').forEach((icon2) => {
        icon2.addEventListener('click', (item) => {
            let itemVal = item.target.parentNode.firstChild.innerText;
            if(myTodoData.includes(itemVal)) {
                removeTodo(itemVal, myTodoData);
            }
            test = item.target.parentElement;
            test.classList.add('removed-item')
            setTimeout(() => {
                test.remove();
            },1000)
          });
    });
    
}

function textStripe() {
    document.querySelectorAll('.icon1').forEach((icon1) => {
        icon1.addEventListener('click', (el) => {
            fc = el.target.parentNode.firstChild;
            fc.classList.add('textEffect');
          });
    });
}

function removeTodo(itemVal, myTodoData) {
    localStorage.removeItem(itemVal);
    index = myTodoData.indexOf(itemVal);
    myTodoData.splice(index, 1);
    localStorage.setItem('mytodo',JSON.stringify(myTodoData));
}

window.onload = (event) =>{
    getLocal();
};