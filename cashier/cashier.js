const billAmount = document.getElementById("bill-amount");
const nextBtn = document.getElementById("next-btn");
const cashGiven = document.getElementById('cash-given');
const checkBtn = document.getElementById('check');
const Errormessage = document.getElementById('message');
const tableSection = document.querySelector(".cash-count");
const numOfNotes = document.querySelectorAll('.num-of-notes');
const returnAmountToCustomer = document.querySelector('.return-amount');

const notes = [2000, 500, 100, 50, 20, 10, 5, 2, 1];

//this prototype function is use to convert the string formats number to actual number
HTMLInputElement.prototype.intVal = function () { 
    return parseInt(this.value);
};

window.onload = function() {
    tableSection.style.display = 'none';
    cashGiven.style.display = 'none';
    document.querySelector(`label[for=${cashGiven.id}]`).style.display = 'none';
    checkBtn.style.display = 'none';
};

nextBtn.addEventListener('click', function showSection() {
    if (!billAmount.value) {
        showMessage("enter some amount");
    } else {
        nextBtn.style.display = 'none';
        document.querySelector(`label[for=${cashGiven.id}]`).style.display = 'block';
        cashGiven.style.display = 'block';
        checkBtn.style.display = 'block';
    }
})

checkBtn.addEventListener("click", function validateAmount() {
    //set the default value of number of notes to 0
    Array.from(numOfNotes).map(item => {
        item.innerText = 0;
    })
    //initially hide any message
    message.style.display = 'none';
    returnAmountToCustomer.innerHTML = '0 Rs/-';
    //display the table after clicking on check button
    tableSection.style.display = 'block';
    //check the bill amount's value should be positive
   
    if (billAmount.intVal() > 0) {
        //check the given cash should be greater than bill amount 
        if (cashGiven.intVal() >= billAmount.intVal()) {
            // calculate returnable cash amount
            const returnAmount = cashGiven.intVal() - billAmount.intVal();
            returnAmountToCustomer.innerHTML = returnAmount + " Rs/-";
            //function for display number of notes to be return
            checkReturnAmount(returnAmount);
        } else {
            showMessage("Insufficient cash given")
        }
    }
    else {
        //error message
        showMessage("Invalid amount");
    }
})

function checkReturnAmount(amount) {
    //check how many number of notes have to return from available notes
    for (let i=0; i<notes.length; i++) {
        //amount/notes[i] will display number of notes to be return eg- 1980/500 = 3
        noteCount = Math.trunc(amount / notes[i]);
        //amount%=notes[i] it will calculate the remaining balance eg- 1980%500 = 480
        //so that in next iteration the amount will be reduced
        amount %= notes[i];
        //display the count of notes to be return in the html
        numOfNotes[i].innerText = noteCount;
    }
}

function showMessage(message) {
    //display 'block' is used to show the html content;
    Errormessage.style.display = 'block';
    //the error message will be display in the html tag
    Errormessage.innerText = message;
}






