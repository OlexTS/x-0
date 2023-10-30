const content = document.querySelector(".content");
const restart = document.querySelector(".js-btn");
content.addEventListener("click", onClick);
restart.addEventListener("click", onClickBtn);

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
    const cells = document.querySelectorAll('.item');
    const values = Array.from(cells).every(val => val.textContent !=='') 
    return values
}
function onClick(e) {
  if (!e.target.textContent) {
    e.target.textContent = player;
    player = player === "X" ? "O" : "X";
    const winner = checkWinner();
    if (winner) {
        content.innerHTML = createMarkup();
      alert(`Player ${winner} won`);
    }
    else if (isDraw()) {
        content.innerHTML = createMarkup();
        alert('It is a draw')
      }
  } else alert("Please enter your value in an empty cell");
}
function onClickBtn() {
  player = "X";
  content.innerHTML = createMarkup();
}
