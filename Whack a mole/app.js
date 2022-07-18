const cursor = document.querySelector(".cursor");
const scoreEl = document.querySelector(".score span");
const countdown = document.querySelector(".countdown span");
const holes = [...document.querySelectorAll(".hole")];
let score = 0;
const sound = new Audio("./assets/smash.mp3");
let timeLeft = 30;

// if (timeLeft === 0) {
//   const gameBoard = document.querySelector(".board");
//   console.log("gameBoard");
// }

let interval = setInterval(() => {
  timeLeft--;
  countdown.textContent = timeLeft;

  if (timeLeft < 10) {
    countdown.textContent = "0" + timeLeft;
  }

  if (timeLeft < 0) {
    document.querySelector(".board").style.display = "none";
    document.querySelector(".box").style.display = "none";
    clearInterval(interval);

    // final score
    const finalScore = document.querySelector(".finalScore");
    const restartBtn = document.querySelector(".restartBtn");
    document.querySelector("body").style.cursor = "default";
    finalScore.style.display = "block";
    restartBtn.style.display = "block";
    cursor.style.display = "none";

    const h3 = document.createElement("h3");
    const h1 = document.createElement("h1");
    h3.textContent = "Your Final Score is : ";
    h1.textContent = score;

    // restart the game
    restartBtn.addEventListener("click", () => {
      window.location.reload();
    });

    finalScore.appendChild(h3);
    finalScore.appendChild(h1);
  }
}, 1000);

function run() {
  const i = Math.floor(Math.random() * holes.length);
  let hole = holes[i];
  let timer = null;

  const img = document.createElement("img");
  img.classList.add("mole");
  img.src = "./assets/mole.png";
  // sound.play();

  img.addEventListener("click", () => {
    score += 10;
    sound.play();
    scoreEl.textContent = score;
    img.src = "./assets/mole-whacked.png";
    clearTimeout(timer);
    setTimeout(() => {
      hole.removeChild(img);
      if (timeLeft > 0) {
        run();
      }
    }, 500);
  });

  hole.appendChild(img);

  timer = setTimeout(() => {
    hole.removeChild(img);
    if (timeLeft > 0) {
      run();
    }
  }, 1500);
}

run();

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});
