// const start = document.getElementById('start');
// const stop = document.getElementById('stop');

// let intervalId;
// start.addEventListener("click", () => {
//     if(!intervalId) {
//         intervalId = setInterval(() => {
//             let hex = "0123456789ABCDEF"
//             let color = '#';
//             for(let i = 0; i < 6; i++) {
//                 let index = Math.floor(Math.random() * 16)
//                 color += hex[index];
//             }
//             console.log(color);
//             document.body.style.backgroundColor = color;
//         },1000)
//     }
// })

// stop.addEventListener("click", () => {
//     clearInterval(intervalId);
//     intervalId = null;
// })

// ---------- break down in small functions -------------
let intervalId;
function randomColor() {
    let hex = "0123456789ABCDEF";
    let color = '#';
    for(let i=0; i<6; i++) {
        color += hex[Math.floor(Math.random() * 16)]
    }
    return color;
}
function changeBgColor() {
    document.body.style.backgroundColor = randomColor();
}
const startChangeingColor = function() {
    if(!intervalId) {
       intervalId = setInterval(changeBgColor, 1000)
    }
}

const stopChangeingColor = function() {
    clearInterval(intervalId);
    intervalId = null;
}

document.getElementById('start').addEventListener("click", startChangeingColor)
document.getElementById('stop').addEventListener("click", stopChangeingColor)


