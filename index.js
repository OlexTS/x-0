const content = document.querySelector(".content");
const btnContainer = document.querySelector(".js-btn-container");
const restart = document.querySelector(".js-btn-restart");
const playMusic = document.querySelector(".js-btn-music-play");
const pauseMusic = document.querySelector(".js-btn-music-pause");
const audio = document.querySelector("#game-audio");
audio.loop = true;

content.addEventListener("click", onClick);
btnContainer.addEventListener("click", onClickBtn);

let player = "X";
const winners = [
  [1, 2, 3],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
];

function playAudio() {
  audio.play();
}
function pauseAudio() {
  audio.pause();
}

function createMarkup() {
  let markup = "";
  for (let i = 1; i <= 9; i += 1) {
    markup += `<div class="item" data-id=${i}></div>`;
  }
  return markup;
}
content.insertAdjacentHTML("beforeend", createMarkup());

function checkWinner() {
  for (const line of winners) {
    const [a, b, c] = line;
    const cells = document.querySelectorAll(
      `[data-id='${a}'], [data-id='${b}'], [data-id='${c}']`
    );
    const values = Array.from(cells).map((value) => value.textContent);
    if (
      values.every((val) => val === "X") ||
      values.every((val) => val === "O")
    ) {
      return values[0];
    }
  }
  return null;
}
function isDraw() {
  const cells = document.querySelectorAll(".item");
  const values = Array.from(cells).every((val) => val.textContent !== "");
  return values;
}
function onClick(e) {
  if (!e.target.textContent) {
    e.target.textContent = player;
    player = player === "X" ? "O" : "X";
    playAudio();
    const winner = checkWinner();
    if (winner) {
      content.innerHTML = createMarkup();
      pauseAudio();
      alert(`Player ${winner} won`);
    } else if (isDraw()) {
      content.innerHTML = createMarkup();
      pauseAudio();
      alert("It is a draw");
    }
  } else alert("Please enter your value in an empty cell");
}
function onClickBtn(e) {
  if (e.target.className === "js-btn-restart") {
    player = "X";
    content.innerHTML = createMarkup();
    pauseAudio();
  }
  if (e.target.className === "js-btn-music-play") {
    playAudio();
  } else {
    pauseAudio();
  }
}

// function disabledScroll() {
//   document.body.style.overflow = 'hidden'
// }
// disabledScroll()