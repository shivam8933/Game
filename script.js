let boxes = document.querySelectorAll(".game_box");
let gameDiv = document.querySelector(".game");
let gameContainer = document.querySelector(".game_container");
let msg = document.querySelector("#msg");
let msgBox = document.querySelector(".msg_box");
let newGame = document.querySelector(".newGameBtn");
let rstGame = document.querySelector(".rstBtn");
let playerNames = document.querySelectorAll(".playerNames");

let turnO = true;

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const disabledBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const newGameBtn = () => {
  turn();
  enableBtn();
  msg.classList.add("hide");
  newGame.classList.add("hide");
  gameDiv.classList.remove("hide");
  rstGame.classList.remove("hide");
  for (const names of playerNames) {
    names.classList.remove("hide");
  }
};
const rstGameBtn = () => {
  enableBtn();
  msg.classList.add("hide");
  newGame.classList.add("hide");
  gameDiv.classList.remove("hide");
  rstGame.classList.remove("hide");
};

const turn = (firt) => {
  if (firt && firt === "X") {
    turnO = false;
  } else if (firt && firt === "O") {
    turnO = true;
  }
};

boxes.forEach((game_box) => {
  game_box.addEventListener("click", () => {
    if (turnO) {
      game_box.innerText = "O";
      game_box.style.color = "#00b7ffb9";
      turnO = false;
    } else {
      game_box.innerText = "X";
      game_box.style.color = "#ffd900";
      turnO = true;
    }
    game_box.disabled = true;
    checkWinner();
  });
});

function checkWinner() {
  let isDraw = true;
  for (pattern of winningPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos2Val);
        turn(pos1Val);
        return;
      }
if  (pos1Val === pos2Val && pos2Val === pos3Val) {
 return pattern;
    }
    if (pos1Val == "" || pos2Val == "" || pos3Val == "") {
      isDraw = false;
    }
  }
  if (isDraw) matchDraw();
}

const showWinner = (winner) => {
  msg.innerText = `Congratulation Winner is ${winner}`;
  msg.classList.remove("hide");
gameDiv.classList.remove("hide");
  newGame.classList.remove("hide");
  rstGame.classList.add("hide");
  for (const names of playerNames) {
    names.classList.add("hide");
  }
  disabledBtn();
};

const matchDraw = (draw) => {
  msg.innerText = `Match Draw! Nobody wins`;
  msg.classList.remove("hide");
  for (const names of playerNames) {
    names.classList.add("hide");
  }
  disabledBtn();
};

newGame.addEventListener("click", newGameBtn);
rstGame.addEventListener("click", rstGameBtn);
