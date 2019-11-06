var socket = io();
var yourNickname = "";
var theWord = "";

document
  .getElementById("nicknameButton")
  .addEventListener("click", onclickNickname);

document
  .getElementById("playAgain")
  .addEventListener("click", onclickPlayAgain);

function onclickNickname() {
  const input = document.getElementById("nicknameInput");
  yourNickname = input.value;
  socket.emit("nickname", input.value);
  setUI("waiting");
}

function onclickPlayAgain() {
  socket.emit("nickname", yourNickname);
  setUI("waiting");
}

function onInputChange(value) {
  console.log(value);
  if (theWord === value) {
    socket.emit("win");
  }
}

socket.on("begin", gameBeginHandler);
socket.on("cancel", cancelHandler);
socket.on("finish", finishHandler);

function finishHandler(winner) {
  const message = yourNickname === winner ? "You win !!" : "You lose !";
  document.getElementById("wordInput").value = "";
  document.getElementById("seconds").textContent = "7";
  document.getElementById("winner").textContent = message;
  setUI("win");
}

function gameBeginHandler({ players, word }) {
  setUI("game");
  setNameVersus(players);
  let i = 7;
  const refInterval = setInterval(() => {
    if (i == 0) {
      clearInterval(refInterval);
      setWord(word);
      return;
    }
    document.getElementById("seconds").textContent = --i;
  }, 1000);
}

function cancelHandler() {
  setUI("waiting");
}

function setWord(word) {
  theWord = word;
  document.getElementById("wordToType").textContent = word;
  document.getElementById("names").textContent = word;
  setUI("word");
}

function setUI(id) {
  let forms = ["waiting", "nicknameForm", "game", "word", "win"];
  forms = forms.filter(i => i !== id);
  forms.forEach(hide);
  show(id);
}

function setNameVersus({ first, second }) {
  document.getElementById("names").textContent = first + " versus " + second;
}

function hide(id) {
  const div = document.getElementById(id);
  div.classList.add("hide");
}

function show(id) {
  const div = document.getElementById(id);
  div.classList.remove("hide");
}
