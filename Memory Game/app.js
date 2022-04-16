const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".playerLivesCount");
const restartBtn = document.querySelector(".restart-btn");
let playerLives = 6;

playerLivesCount.textContent = playerLives;

const getData = () => [
  { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 6, name: "led zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
  { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 14, name: "led zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

const randomise = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenerator = () => {
  const cardData = randomise();

  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCard(e);
    });
  });
};

function checkCard(e) {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");

  /**** Checking the two matching cards ****/
  if (flippedCards.length === 2) {
    /**** If it matches ****/
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      // console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
      const toggleCards = document.querySelectorAll(".toggleCard");

      /**** Winning Messages ****/
      if (toggleCards.length === 16) {
        finishGame("Hurray!! You have find all the matching cards 🎉🎊");
      }
    } else {
      /**** If it didn't ****/

      // console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 900);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;

      /**** Lossing Messages ****/
      if (playerLives === 0) {
        finishGame("Oops!! You aren't able to find all the matching cards 😫");
        // restart();
      }
    }
  }
}

const finishGame = (text) => {
  const heading = document.querySelector("h1");
  const msg = document.createElement("p");
  msg.textContent = text;

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => (card.style.pointerEvents = "none"));

  restartBtn.style.display = "block";
  heading.insertAdjacentElement("afterend", msg);
};

// restart the game
const restart = () => {
  window.location.reload();
};

cardGenerator();
