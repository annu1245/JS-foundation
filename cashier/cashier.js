const billAmount = document.getElementById("bill-amount");
const cashGiven = document.getElementById('cash-given');
const checkBtn = document.getElementById('check');
const message = document.getElementById('message');
const numOfNotes = document.querySelectorAll('.num-of-notes');
const nextBtn = document.getElementById("next-btn");
const tableSection = document.querySelector(".cash-count");
const cashLabel = document.getElementById("cash-label");

HTMLInputElement.prototype.val = function () { 
    return parseInt(this.value);
};

const notes = [2000,500,100,20,10,5,1];

checkBtn.addEventListener("click", function validateAmount() {
    //initially hide any message
    message.style.display = 'none';
    tableSection.style.display = 'block';
    //check the bill amount's value should be positive
   
    if(billAmount.val() > 0) {
        //check the given cash should be greater than bill amount 
        if(cashGiven.val() >= billAmount.val()) {
            // calculate returnable cash amount
            const returnAmount = cashGiven.val() - billAmount.val();
            console.log(returnAmount);
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
    for(let i=0; i<notes.length; i++) {
        //amount/notes[i] will display number of notes to be return eg- 1980/500 = 3
        noteCount = Math.trunc(amount / notes[i]);
        //amount%=notes[i] it will calculate the remaining balance eg- 1980%500 = 480
        //so that in next iteration the amount will be reduced
        amount %= notes[i];
        //display the count of notes to be return in the html
        numOfNotes[i].innerText = noteCount;
    }
}

function showMessage(msg) {
    //display 'block' is used to show the html content;
    message.style.display = 'block';
    //the error message will be display in the html tag
    message.innerText = msg;
}

window.onload = function() {
    tableSection.style.display = 'none';
    cashGiven.style.display = 'none';
    // document.querySelector(`label[for=${cashGiven.id}]`).style.display = 'none';
    cashLabel.style.display = 'none';
    checkBtn.style.display = 'none';
};

nextBtn.addEventListener('click', function showSection() {
    let bill = parseInt(billAmount.value);
   if(!billAmount.value) {
        showMessage("enter some amount");
   } else {
        cashLabel.style.display = 'block';
        cashGiven.style.display = 'block';
        checkBtn.style.display = 'block';
        nextBtn.style.display = 'none';
   }
})


