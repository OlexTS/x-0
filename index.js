const content = document.querySelector(".content");
const statistic = document.querySelector(".js-stat");
const btnContainer = document.querySelector(".js-btn-container");
const restart = document.querySelector(".js-btn-restart");
const playMusic = document.querySelector(".js-btn-music-play");
const pauseMusic = document.querySelector(".js-btn-music-pause");
const audio = document.querySelector("#game-audio");
audio.loop = true;

content.insertAdjacentHTML("beforeend", createMarkup());
content.addEventListener("click", onClick);
btnContainer.addEventListener("click", onClickBtn);

const KEY_X = "playerX";
const KEY_0 = "player0";
let playerX = JSON.parse(localStorage.getItem(KEY_X)) || [];
let player0 = JSON.parse(localStorage.getItem(KEY_0)) || [];
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

function startGame() {
  [...content.children].forEach((item) => {
    const id = Number(item.dataset.id);
    if (playerX.includes(id)) {
      item.textContent = "X";
    } else if (player0.includes(id)) {
      item.textContent = "O";
    }
  });
}
startGame();

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
function createStatMarkup() {
  return markup = `<table>
  <tr>
    <th>Player X</th>
    <th>Player 0</th>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
</table>`
}



function checkWinner(arr) {
  return winners.some((item) => item.every((id) => arr.includes(id)));
}

// function checkWinner() {
//   for (const line of winners) {
//     const [a, b, c] = line;
//     const cells = document.querySelectorAll(
//       `[data-id='${a}'], [data-id='${b}'], [data-id='${c}']`
//     );
//     const values = Array.from(cells).map((value) => value.textContent);

//     if (
//       values.every((val) => val === "X") ||
//       values.every((val) => val === "O")
//     ) {
//       return values[0];
//     }
//   }
//   return null;
// }
// function isDraw() {
//   const cells = document.querySelectorAll(".item");
//   const values = Array.from(cells).every((val) => val.textContent !== "");
//   return values;
// }
function onClick(e) {
  if (!e.target.textContent) {
    e.target.textContent = player;
    playAudio();
    let result;
    const id = Number(e.target.dataset.id);
    if (player === "X") {
      playerX.push(id);
      localStorage.setItem(KEY_X, JSON.stringify(playerX));
      result = checkWinner(playerX);
    } else {
      player0.push(id);
      localStorage.setItem(KEY_0, JSON.stringify(player0));
      result = checkWinner(player0);
    }
    setTimeout(() => {
      if (result) {
        alert(`Player ${player} won`);
        pauseAudio();
        playerX = [];
        player0 = [];
        localStorage.clear();
        content.innerHTML = createMarkup();
        return;
      }
      player = player === "X" ? "O" : "X";
    });
  } else {
    alert("Please enter your value in an empty cell");
  }
  //   playAudio();
  //   const winner = checkWinner();
  //   if (winner) {
  //     content.innerHTML = createMarkup();
  //     pauseAudio();
  //     alert(`Player ${winner} won`);
  //   } else if (isDraw()) {
  //     content.innerHTML = createMarkup();
  //     pauseAudio();
  //     alert("It is a draw");
  //   }
  // } else alert("Please enter your value in an empty cell");
}

function onClickBtn(e) {
  if (e.target.className === "js-btn-restart") {
    player = "X";
    playerX = [];
    player0 = [];
    pauseAudio();
    localStorage.clear();
    content.innerHTML = createMarkup();
  }
  if (e.target.className === "js-btn-statistic") {
    statistic.insertAdjacentHTML('beforeend', createStatMarkup())
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
