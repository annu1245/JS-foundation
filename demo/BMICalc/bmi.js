const form = document.querySelector('form');
const bmiMessage = document.getElementById('message');
const clearBtn = document.getElementById('clear');
const details = document.getElementById('details');
const bmiValue = document.getElementById('bmiValue');


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const height = Number(document.getElementById('height').value);
    const weight = Number(document.getElementById('weight').value);

    if(height === '' || height <= 0 || isNaN(height)) {
        alert("height is not valid");
    }else if(weight === '' || weight <= 0 || isNaN(weight)) {
        alert("weight is not valid")
    }else {
        const bmi = (weight / ((height * height)/ 10000)).toFixed(2);
        bmiValue.innerHTML = `your BMI is ${bmi}`;
        showBmiRange(bmi);
        details.style.display = 'block';
    }
})

clearBtn.addEventListener("click", () => {
    document.getElementById('myform').reset();
    hideDetails();
})

function message(userMessage) {
    bmiMessage.innerHTML = userMessage;
}

function showBmiRange(bmi) {
    if(bmi < 18.6) {
        message("you are under weight")
    }else if(bmi > 18.6 || bmi < 24.9) {
        message("you are in normal range")
    }else if(bmi > 24.9) {
        message("you are over weight")
    }
}

function hideDetails () {
    details.style.display = 'none';
    bmiValue.innerHTML = '';
    bmiMessage.innerHTML = '';

}
window.onload = hideDetails()