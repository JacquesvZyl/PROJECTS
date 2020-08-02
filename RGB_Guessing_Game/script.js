let numOfSqrs = 6;
let colors = generateRandomColors(numOfSqrs);
let h1 = document.querySelector("h1");
let pickedcolor = pickcolor();
let sqrs = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colordisplay");
let messageDisplay = document.querySelector("#message");
let reset = document.querySelector("#reset");
let modeBtn = document.querySelectorAll(".mode");

init();

function init() {
  for (let i = 0; i < modeBtn.length; i++) {
    modeBtn[i].addEventListener("click", function () {
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numOfSqrs = 3) : (numOfSqrs = 6);
      difficultyBtns();
    });
  }
  for (let i = 0; i < sqrs.length; i++) {
    // Add initial colors
    sqrs[i].style.backgroundColor = colors[i];

    //Add click listeners to squares
    sqrs[i].addEventListener("click", function () {
      //grab color of clicked square and compare
      let clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedcolor) {
        messageDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        reset.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
  difficultyBtns();
}

function difficultyBtns() {
  messageDisplay.textContent = "";
  colors = generateRandomColors(numOfSqrs);
  pickedcolor = pickcolor();
  colorDisplay.textContent = pickedcolor;
  h1.style.backgroundColor = "rgb(60, 118, 174)";
  reset.textContent = "New colors";
  for (let i = 0; i < sqrs.length; i++) {
    if (colors[i]) {
      sqrs[i].style.display = "block";
      sqrs[i].style.backgroundColor = colors[i];
    } else {
      sqrs[i].style.display = "none";
    }
  }
}
function changeColors(color) {
  for (let i = 0; i < colors.length; i++) {
    sqrs[i].style.backgroundColor = color;
  }
}
function pickcolor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
function generateRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }

  return arr;
}
function randomColor() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
reset.addEventListener("click", function () {
  difficultyBtns();
});
