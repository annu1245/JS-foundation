submintBtn = document.getElementById("submit");
listDiv = document.querySelector("#list");
userInput = document.querySelector('input');
testbtn = document.getElementById('test');
clearBtn = document.getElementById('clear_btn');
completedTaskList = document.querySelector('.task_done');
const comHeading = document.querySelector('.com_tsk');
//click Event on Submit Button

comHeading.style.visibility = "hidden";

function getIndex() {
    let myTodoData = JSON.parse(localStorage.getItem("mytododata")) || {"runningTask":{},"completedTask" : {}};
    let arr = Object.keys(myTodoData?.runningTask);
    let arr2 = Object.keys(myTodoData?.completedTask);
    let nar = arr.concat(arr2);
    if(nar.length == 0) {
        return 0;
    }else{
        let maxInd = Math.max(...nar)+1;
        return maxInd;
    }
    // let nextIndCount = arr + arr2 + 1;
    // return nextIndCount;
    return 1;
}

getIndex();

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
        // addListeners();
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
    addComptaskListener(done);
    addEditListener(edit);
    addDeleteListener(del);

}

//add Listeners to the edit and delete button
function addListeners() {
    document.querySelectorAll('.edit').forEach((editDiv) => addEditListener(editDiv));
    document.querySelectorAll('.del').forEach((delDiv) => addDeleteListener(delDiv));
    document.querySelectorAll('.done').forEach((compDiv) => addComptaskListener(compDiv));
}

function addComptaskListener(compElement) {
    compElement.addEventListener('click', (elem) => {
        console.log("inner", elem.target);
        const text = elem.target.parentElement.firstChild.innerHTML;
        const id = parseInt(elem.target.parentElement.getAttribute('index'));
        const currTime = new Date().getTime();
        console.log(text, id);
        elem.target.parentElement.style.display = 'none';
        addCompletedDiv(text, currTime, id, "calledfromListener");
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
            console.log("update local called")
            updateLocal(text, elemIndex); 
           }
        }
        else{
            console.log("edit")
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

function getTime(storedTimestamp) {
        // Retrieve the timestamp from localStorage
    
        // Check if there's a stored timestamp
        if (storedTimestamp) {
            // Convert the stored timestamp to a number
            const completionTime = new Date(parseInt(storedTimestamp, 10));
    
            // Get the current time
            const currentTime = new Date();
    
            // Calculate the time difference in milliseconds
            const timeDifference = currentTime - completionTime;
    
            // Display the task completion information
            //const taskCompletionInfo = document.getElementById("taskCompletionInfo");
            // taskCompletionInfo.textContent = `You completed this task ${formatTimeDifference(timeDifference)} ago`;
            // return `${formatTimeDifference(timeDifference)} ago`;
            let mytime = formatTimeDifference(timeDifference);
            if(mytime === 'just now'){
                return mytime;
            }else{
                return `${mytime} ago`;
            }


        } else {
            // No stored timestamp found
            console.log("No task completion timestamp found in localStorage.");
        }
    
        // Function to format the time difference
        function formatTimeDifference(timeDifference) {
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(months / 12);
    
            if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
            if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
            if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
            if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
            if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
            if (seconds > 0) return `${seconds} second${seconds > 1 ? 's' : ''}`;
            
            return 'just now';
        }
   
    
}

function addCompletedDiv(data, time, id, st) {
    const currT = getTime(time);
    console.log(data, currT, id);
    text =  `<div class="completed_task" index=${id} time=${currT}>
                <p>${data}</p>
                <div>
                <i class="fa-solid fa-check-double com"></i>
                <span class="time">${currT}</span>
                </div>
            </div>`
    completedTaskList.insertAdjacentHTML('beforeend',text);

    if(completedTaskList.children.length === 1){
        comHeading.style.visibility = "visible";
        
        console.log("I have one child ji");
    }
    // let comDiv = document.createElement('div');
    // comDiv.classList.add('completed_task');
    // comDiv.setAttribute('index', id);
    // comDiv.setAttribute('time', currT);

    // let pTag = document.createElement('p');
    // pTag.innerHTML = data;
    // let timeStamp = document.createElement('div');
    // let tm = `<i class="fa-solid fa-check-double com"></i>
    //             <span class="time">${currT}</span>`
    // timeStamp.innerHTML = tm;
    // comDiv.appendChild(pTag);
    // comDiv.appendChild(timeStamp);
    // completedTaskList.appendChild(comDiv);
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
                addCompletedDiv(arr[0], arr[1], key, "calledFromGetLocal");
            }
        }
    }
}

function updateLocal(updatedText, index) {
    let myTodoData = JSON.parse(localStorage.getItem("mytododata"));
    myTodoData.runningTask[index] = updatedText;
    localStorage.setItem("mytododata", JSON.stringify(myTodoData));
}

function removeLocal(index) {
    let myTodoData = JSON.parse(localStorage.getItem('mytododata'));
    delete myTodoData.runningTask[index];
    localStorage.setItem('mytododata', JSON.stringify(myTodoData));
}

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    clearBtn.style.display = 'none';
    comHeading.style.visibility = "hidden";

    // location.reload();
    getLocal();
})

window.onload = (event) =>{
    getLocal();
};