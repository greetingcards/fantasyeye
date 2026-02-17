(() => {

const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");
const nameInput = document.getElementById("name");
const downloadBtn = document.getElementById("downloadBtn");
const downloadLink = document.getElementById("downloadLink");

const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const resetBtn = document.getElementById("resetBtn");

canvas.width = 2016;
canvas.height = 3840;

const DEFAULT_X = 1008;
const DEFAULT_Y = 3150;

let nameX = DEFAULT_X;
let nameY = DEFAULT_Y;

const STEP = 10;

const bgImg = new Image();
bgImg.src = "images/card.png"; // ضع صورة بطاقة عين الخيال هنا

const NAME_COLOR = "#154F83";
const FONT_FAMILY = "Tajawal, Arial, sans-serif";

function draw() {

ctx.clearRect(0,0,canvas.width,canvas.height);

if(bgImg.complete){
ctx.drawImage(bgImg,0,0,canvas.width,canvas.height);
}

const name = nameInput.value.trim();
if(!name) return;

let fontSize = 95;
ctx.fillStyle = NAME_COLOR;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`;

const maxWidth = canvas.width * 0.75;

while(ctx.measureText(name).width > maxWidth && fontSize > 55){
fontSize -= 2;
ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`;
}

ctx.fillText(name, nameX, nameY);
}

function move(dx,dy){
nameX += dx;
nameY += dy;
draw();
}

function download(){
draw();
const dataUrl = canvas.toDataURL("image/png");
downloadLink.href = dataUrl;
downloadLink.click();
}

nameInput.addEventListener("input", draw);
downloadBtn.addEventListener("click", download);

upBtn.addEventListener("click", ()=> move(0,-STEP));
downBtn.addEventListener("click", ()=> move(0,STEP));
leftBtn.addEventListener("click", ()=> move(-STEP,0));
rightBtn.addEventListener("click", ()=> move(STEP,0));

resetBtn.addEventListener("click", ()=>{
nameX = DEFAULT_X;
nameY = DEFAULT_Y;
draw();
});

bgImg.onload = draw;

})();
