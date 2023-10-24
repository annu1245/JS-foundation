submintBtn = document.getElementById("submit");
listDiv = document.querySelector("#list");
text = document.querySelector('input');
testbtn = document.getElementById('test');

submintBtn.addEventListener("click", function() {
    if(text.value != '') {
        
        elemDiv = document.createElement('div');
        elemDiv.classList.add('elem');

        textDiv = document.createElement('spam');
        textDiv.classList.add('text');
        textDiv.innerText = text.value;

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

        text.value = "";
    }else {
        alert("please write your todo")
    }
})


document.querySelectorAll('.icon2').forEach((icon2) => {
    icon2.addEventListener('click', (item) => {
        console.log(item.target.parentElement);
        test = item.target.parentElement;
        test.remove();
      });
})
