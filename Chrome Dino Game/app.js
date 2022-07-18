const dino = document.querySelector(".dino");
const grid = document.querySelector(".grid");
const alertMsg = document.querySelector(".alert");
let isJumping = false;
let gravity = 0.9;
let isGameOver = false;

document.addEventListener("keyup", control);

function control(e) {
  if (e.keyCode === 32) {
    if (!isJumping) {
      isJumping = true;
      jump();
    }
  }
}

let position = 0;
function jump() {
  let count = 0;

  let interval = setInterval(() => {
    // move down
    if (count === 15) {
      clearInterval(interval);
      let timerId = setInterval(() => {
        // console.log("down");
        count--;
        position -= 5.6;
        position *= gravity;
        // console.log(position);

        dino.style.bottom = position + "px";

        if (count === 0) {
          isJumping = false;
          clearInterval(timerId);
        }
      }, 20);
    }

    // move up
    // console.log("up");
    count++;
    position += 30;
    position *= gravity;
    // console.log(position);
    dino.style.bottom = position + "px";
  }, 20);
  // console.log(position);
}

function generateObstacles() {
  let obstaclePosition = 1000;
  let randomTime = Math.random() * 4000;
  const obstacle = document.createElement("div");
  if (!isGameOver) {
    obstacle.classList.add("obstacle");
    obstacle.style.left = obstaclePosition + "px";

    let timerId = setInterval(() => {
      if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timerId);
        alertMsg.textContent = "Game Over";
        isGameOver = true;
        // remove all children
        // while (grid.firstChild) {
        //   grid.removeChild(grid.lastChild);
        // }
      } else if (obstaclePosition < 0) {
        const obstacleNode = document.querySelectorAll(".obstacle");
        // obstacleNode.forEach((item) => (item.style.left = -50 + "px"));
        for (let i = 0; i < obstacleNode.length - 2; i++) {
          // obstacleNode[i].classList.remove("obstacle");
          grid.removeChild(obstacleNode[i]);
        }
      }
      //  else {
      //   const obstacleNode = document.querySelectorAll(".obstacle");
      //   for (let i = 0; i < obstacleNode.length - 2; i++) {
      //     obstacleNode[i].classList.remove("obstacle");
      //     grid.removeChild(obstacleNode[i]);
      //   }
      // }
      // if (obstaclePosition < -50) {
      //   // console.log("less than 0");
      //   const obstacleNode = document.querySelectorAll(".obstacle");
      //   // [...obstacleNode].shift();
      //   for (let i = 0; i < obstacleNode.length - 2; i++) {
      //     // obstacleNode[i].classList.remove("obstacle");
      //     grid.removeChild(obstacleNode[i]);
      //   }
      //   // obstacle.style.left = -50 + "px";
      // }

      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + "px";
    }, 20);
  }

  if (!isGameOver) setTimeout(generateObstacles, randomTime);
  grid.appendChild(obstacle);
}
// generateObstacles();

// const WORLD_WIDTH = 100;
// const WORLD_HEIGHT = 30;

// const worldElem = document.querySelector("[data-world]");

// setPixelToWorldScale();
// window.addEventListener("resize", setPixelToWorldScale);

// function setPixelToWorldScale() {
//   let worldToPixelScale;
//   if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
//     console.log("width wala");
//     worldToPixelScale = window.innerWidth / WORLD_WIDTH;
//   } else {
//     console.log("height wala");
//     worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
//   }

//   worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
//   worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
// }
