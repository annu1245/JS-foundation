submintBtn = document.getElementById("submit");
listDiv = document.querySelector("#list");
text = document.querySelector('input');
testbtn = document.getElementById('test');

submintBtn.addEventListener("click", function() {
    input_val = text.value.trim()
    if(input_val != '') {
        
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

        document.querySelectorAll('.icon2').forEach((icon2) => {
            icon2.addEventListener('click', (item) => {
                test = item.target.parentElement;
                test.classList.add('removed-item')
                setTimeout(() => {
                    test.remove();
                },1000)
              });
        });

        document.querySelectorAll('.icon1').forEach((icon1) => {
            icon1.addEventListener('click', (el) => {
                fc = el.target.parentNode.firstChild;
                fc.classList.add('textEffect');
              });
        });

       text.value = '';
       

    } else {
        alert("please write your todo")
    }
})



