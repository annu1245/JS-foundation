const billAmount = document.getElementById("bill-amount");
const cashGiven = document.getElementById('cash-given');
const checkBtn = document.getElementById('check');
const message = document.getElementById('message');
const numOfNotes = document.querySelectorAll('.num-of-notes');
const notes = [2000,500,100,20,10,5,1];

checkBtn.addEventListener("click", function validateAmount() {
    message.style.display = 'none';
    if(billAmount.value > 0){
        if(cashGiven.value >= billAmount.value){
            const returnAmount = cashGiven.value - billAmount.value;
            console.log(returnAmount);
            checkReturnAmount(returnAmount);
        }else{
            console.log(cashGiven.value - billAmount.value);
            showMessage("unsufficient cash given")
        }
    }
    else{
        showMessage("Invalid amount");
    }
})

function checkReturnAmount(amount) {
    for(let i=0; i<notes.length; i++) {
        noteCount = Math.trunc(amount / notes[i]);
        amount %= notes[i];
        numOfNotes[i].innerText = noteCount;
    }
}

function showMessage(msg) {
    message.style.display = 'block';
    message.innerText = msg;
}

