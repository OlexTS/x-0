const content = document.querySelector(".content");
const restart = document.querySelector(".js-btn");
content.addEventListener("click", onClick);
restart.addEventListener("click", onClickBtn);

let player = "X";
const win = [
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
  for (i = 1; i <= 9; i += 1) {
    markup += `<div class="item" data-id=${i}></div>`;
  }
  return markup;
}
content.insertAdjacentHTML("beforeend", createMarkup());

function onClick(e) {
  if (!e.target.textContent) {
    e.target.textContent = player;
    player = player === "X" ? "O" : "X";
  } else alert("Please enter your value in an empty cell");
}
function onClickBtn() {
  player = "X";
  content.innerHTML = createMarkup();
}
