submintBtn = document.getElementById("submit");
list_div = document.querySelector("#list");
text = document.querySelector('input');


submintBtn.addEventListener("click", function() {
    elemDiv = document.createElement("div");
    elemDiv.classList.add("elem");

    ptag = document.createElement("p");
    ptag.innerText = text.value;

    iconDiv = document.createElement('div');
    iconDiv.classList.add("icons");
    
    elemDiv.appendChild(ptag);
    elemDiv.appendChild(iconDiv);
    list_div.appendChild(elemDiv);
    text.value = "";
})


