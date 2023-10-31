submintBtn = document.getElementById("submit");
listDiv = document.querySelector("#list");
text = document.querySelector('input');
testbtn = document.getElementById('test');
clearBtn = document.getElementById('clear_btn');

//click Event on Submit Button
submintBtn.addEventListener("click", function() {
    //get the index for the next div
    let todoIndex = listDiv.getElementsByClassName('elem').length;
    todoIndex.length == 0 ? clearBtn.style.display = 'none' :  clearBtn.style.display = 'block';
    input_val = text.value.trim(); //trim the extra spaces
    if (input_val != '') {
        addDiv(input_val, todoIndex);
        setLocal(input_val, todoIndex);
        addListeners();
        text.value = '';
    } 
    else {
        alert("please write your todo");
    }
})

function addDiv(input_val, todoIndex) {
    elemDiv = document.createElement('div');
    elemDiv.classList.add('elem', 'new-box');
    elemDiv.setAttribute('index', todoIndex);

    textDiv = document.createElement('textarea');
    textDiv.classList.add('check-area');
    textDiv.setAttribute('readonly', 'readonly');
    textDiv.innerText = input_val;

    edit = document.createElement('button');
    edit.classList.add('edit');
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    del = document.createElement('button');
    del.classList.add('del');
    del.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    elemDiv.appendChild(textDiv);
    elemDiv.appendChild(edit);
    elemDiv.appendChild(del);
    listDiv.appendChild(elemDiv);
    setTimeout(() => elemDiv.classList.remove('new-box'), 300);
}

//add Listeners to the edit and delete button
function addListeners() {
    document.querySelectorAll('.edit').forEach((editDiv) => addEditListener(editDiv));
    document.querySelectorAll('.del').forEach((delDiv) => addDeleteListener(delDiv));
}

//Edit Event Listener
function addEditListener(editElement) {
    editElement.addEventListener('click', (element) => {
        let textArea = element.target.parentElement.firstChild;
        //check either clicked to edit the todo or edit is done
        let = isEditable = textArea.getAttribute('readonly');
        if(isEditable !== null) {
            // edit permission -> remove readonly and display textarea to edit
            element.target.innerHTML = '<i class="fa-regular fa-circle-check">';
            textArea.removeAttribute('readonly');
            textArea.style.background = "white";
            textArea.focus();
            textArea.selectionStart = textArea.value.length;
        }
        else{
            // done update -> set readonly and remove the editable textarea
            textArea.setAttribute('readonly', 'readonly');
            textArea.style.background = "yellow";
            element.target.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            let elemIndex = element.target.parentElement.getAttribute('index');
            updateLocal(textArea.value, elemIndex); 

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
        setTimeout(() => elementDiv.remove(), 1000);
        removeLocal(index);
    })
}

// ---------- ----------- LocalStorage ---------------- ------------//

function setLocal(data, index) {
    let myTodoData = JSON.parse(localStorage.getItem("mytodo")) || {};
    myTodoData[index] = data;
    localStorage.setItem("mytodo", JSON.stringify(myTodoData));
}

function getLocal() {
    let myTodoData = JSON.parse(localStorage.getItem("mytodo")) || {};
    if (myTodoData === null || Object.keys(myTodoData).length === 0) {
        listDiv.innerHTML = '';
        clearBtn.style.display = 'none';   
        return;
    } else {
        for (var key in myTodoData) {
            if (myTodoData.hasOwnProperty(key)) {
              var val = myTodoData[key];
              //show all data of localStorage
              addDiv(val, key);
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
    let myTodoData = JSON.parse(localStorage.getItem('mytodo'));
    delete myTodoData[index];
    localStorage.setItem('mytodo', JSON.stringify(myTodoData));
}

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    // location.reload();
    getLocal();
})

window.onload = (event) =>{
    getLocal();
    addListeners();
};