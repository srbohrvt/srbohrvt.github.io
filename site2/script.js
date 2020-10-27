const logo=document.querySelector('#imglogo')
const down=document.querySelector('#imgDown')
let up = down.style.top;
let bootom = down.style.bottom;

let angle = 0;
let leap = 10;
let l = false;
setInterval(() => {
    logo.style.transform = "rotateZ(" + angle + "deg)";
    angle = angle + 1;
}, 30)