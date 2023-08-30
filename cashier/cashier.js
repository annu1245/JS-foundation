const billAmount = document.getElementById("bill-amount");
const cashGiven = document.getElementById('cash-given');
const checkBtn = document.getElementById('check');
const message = document.getElementById('message');
const numOfNotes = document.querySelectorAll('.num-of-notes');
const notes = [2000,500,100,20,10,5,1];

checkBtn.addEventListener("click", function validateAmount() {
    //initially hide any message
    message.style.display = 'none';
    //check the bill amount's value should be positive
    if(billAmount.value > 0){
        //check the given cash should be greater than bill amount 
        if(cashGiven.value >= billAmount.value){
            // calculate returnable cash amount
            const returnAmount = cashGiven.value - billAmount.value;
            console.log(returnAmount);
            //function for display number of notes to be return
            checkReturnAmount(returnAmount);
        }else{
            showMessage("unsufficient cash given")
        }
    }
    else{
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

