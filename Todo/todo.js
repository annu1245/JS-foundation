submintBtn = document.getElementById("submit");
listDiv = document.querySelector("#list");
userInput = document.querySelector('input');
testbtn = document.getElementById('test');
clearBtn = document.getElementById('clear_btn');
completedTaskList = document.querySelector('.task_done');
//click Event on Submit Button
function getIndex() {
    let myTodoData = JSON.parse(localStorage.getItem("mytododata")) || {"runningTask":{},
                    "completedTask" : {}};
    let arr = Object.keys(myTodoData?.runningTask).length;
    let arr2 = Object.keys(myTodoData?.completedTask).length;
    let nextIndCount = arr + arr2 + 1;
    return nextIndCount;
}

submintBtn.addEventListener("click", function() {
    console.log("submit");
    //get the index for the next div
    let todoIndex = getIndex();
    console.log("todoIndex", todoIndex);
    // todoIndex.length == 0 ? clearBtn.style.display = 'none' : clearBtn.style.display = 'block';
    input_val = (userInput.value).trim(); //trim the extra spaces
    if (input_val != '' || input_val != undefined) {
        clearBtn.style.display = 'block';
        addDiv(input_val, todoIndex);
        setLocal(input_val, todoIndex, false, 'time');
        addListeners();
        userInput.value = '';
    } 
    else {
        alert("please write your todo");
    }
})

function checkRemainingTodo() {
    let todoIndex = listDiv.getElementsByClassName('elem').length;
    todoIndex == 0 ? clearBtn.style.display = 'none' : clearBtn.style.display = 'block';
}


function addDiv(input_val, todoIndex) {
    elemDiv = document.createElement('div');
    elemDiv.classList.add('elem', 'new-box');
    elemDiv.setAttribute('index', todoIndex);

    textDiv = document.createElement('span');
    textDiv.classList.add('text-area');
    textDiv.setAttribute('contenteditable', 'false');
    textDiv.setAttribute('role', 'textarea');
    textDiv.innerText = input_val;

    edit = document.createElement('button');
    edit.classList.add('edit');
    edit.setAttribute('title', 'edit');
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    del = document.createElement('button');
    del.classList.add('del');
    del.setAttribute('title', 'delete');
    del.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    done = document.createElement('button');
    done.classList.add('done');
    done.setAttribute('title', 'done');
    done.innerHTML = '<i class="fa-solid fa-check"></i>';

    elemDiv.appendChild(textDiv);
    elemDiv.appendChild(done);
    elemDiv.appendChild(edit);
    elemDiv.appendChild(del);
    listDiv.appendChild(elemDiv);
    setTimeout(() => elemDiv.classList.remove('new-box'), 300);
}

//add Listeners to the edit and delete button
function addListeners() {
    document.querySelectorAll('.edit').forEach((editDiv) => addEditListener(editDiv));
    document.querySelectorAll('.del').forEach((delDiv) => addDeleteListener(delDiv));
    document.querySelectorAll('.done').forEach((compDiv) => addComptaskListener(compDiv));
}

function addComptaskListener(compElement) {
    compElement.addEventListener('click', (elem) => {
        const text = elem.target.parentElement.firstChild.innerHTML;
        const id = parseInt(elem.target.parentElement.getAttribute('index'));
        const date = new Date();
        let currTime = date.toLocaleTimeString();
        console.log(text, id);
        elem.target.parentElement.style.display = 'none';
        addCompletedDiv(text, date, id);
        setLocal(text, id, true, currTime);
    })
}

//Edit Event Listener
function addEditListener(editElement) {
    editElement.addEventListener('click', (element) => {
        let textArea = element.target.parentElement.firstChild;
        //check either clicked to edit the todo or edit is done
        let isEditable = textArea.getAttribute('contenteditable'); //default-false
        if(isEditable === "true") {
           // done update -> set readonly and remove the editable textarea
           textArea.setAttribute('contenteditable', 'false');
           textArea.classList.remove('edit_textArea');
           textArea.classList.add('text-area');
           element.target.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
           let elemIndex = element.target.parentElement.getAttribute('index');
           textArea.innerHTML = textArea.innerHTML.trim();
           let text = textArea.innerText.trim();
           if(text === ''){
            alert("not a valid todo");
            //---------------------------------
           }else {
            updateLocal(text, elemIndex); 
           }
        }
        else{
            // edit permission -> remove readonly and display textarea to edit
            element.target.innerHTML = '<i class="fa-regular fa-circle-check">';
            textArea.setAttribute('contenteditable', 'true');
            textArea.classList.remove('text-area');
            textArea.classList.add('edit_textArea');
            // to add focus to the end of the text
                textNode = textArea.firstChild;
                let range = document.createRange();
                let sel = window.getSelection();
                range.setStart(textNode, textNode.length);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
        }
    })
}

//delete one todo which is clicked
function addDeleteListener(delElement) {
    delElement.addEventListener("click", (element) => {
        let index = element.target.parentElement.getAttribute('index');
        let elementDiv = element.target.parentElement;
        //add the removed-item class for the animation while deleting todo
        elementDiv.classList.add('removed-item');
        setTimeout(function() {
            elementDiv.remove();
            checkRemainingTodo();
        },1000)
        removeLocal(index);
    }) 
}

function addCompletedDiv(data, time, id) {
    console.log("-------------",completedTaskList)
    console.log(data, time, id);
    text =  `<div class="completed_task" index=${id} time=${time}>
                <p>${data}</p>
                <i class="fa-solid fa-check-double"></i>
            </div>`
    completedTaskList.insertAdjacentHTML('beforeend',text);
}

// ---------- ----------- LocalStorage ---------------- ------------//

function setLocal(data, index, completed=false, currTime) {
    console.log("setLocal", data, index, completed);
    let myTodoData = JSON.parse(localStorage.getItem("mytododata")) || {"runningTask":{},
"completedTask" : {}};
    console.log(myTodoData);
    if(completed) {
        myTodoData.completedTask[index] = [data, currTime];
        delete myTodoData.runningTask[index];
    }else {
        myTodoData.runningTask[index] = data;
    }
    localStorage.setItem("mytododata", JSON.stringify(myTodoData));
    // "mytodo" = {

    //     "runningTask" : {"0":"sdkfhb", "1": "dffdsigf"},

    //     "completedTask" : {
    //         "0" : ['dfkdj', "time"],
    //         "1" : ["dssfu", "time"]
    //     }
    // }


}


function getLocal() {
    let myTodoData = JSON.parse(localStorage.getItem("mytododata")) || {"runningTask" : {}, "completedTask" : {}};
    let runningTodo = myTodoData.runningTask;
    if (runningTodo === null || Object.keys(runningTodo).length === 0) {
        listDiv.innerHTML = '';
        clearBtn.style.display = 'none';   
    } else {
        for (let key in runningTodo) {
            if (runningTodo.hasOwnProperty(key)) {
              let val = runningTodo[key];
              //show all data of localStorage
              addDiv(val,key);
            }
        }
    }

    let completedTodo = myTodoData.completedTask;
    if(completedTodo === null || Object.keys(completedTodo).length === 0) {
        completedTaskList.innerHTML = '';
    }else {
        console.log("Else");
        for(let key in completedTodo) {
            if(completedTodo.hasOwnProperty(key)){
                let arr = completedTodo[key];
                addCompletedDiv(arr[0], arr[1], key);
            }
        }
    }
}

function updateLocal(updatedText, index) {
    let myTodoData = JSON.parse(localStorage.getItem("mytodo"));
    myTodoData[index] = updatedText;
    localStorage.setItem("mytodo", JSON.stringify(myTodoData));
}

function removeLocal(index) {
    let myTodoData = JSON.parse(localStorage.getItem('mytododata'));
    delete myTodoData.runningTask[index];
    localStorage.setItem('mytododata', JSON.stringify(myTodoData));
}

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    clearBtn.style.display = 'none';
    // location.reload();
    getLocal();
})

window.onload = (event) =>{
    getLocal();
    addListeners();
};