let socket = io();

document
  .getElementById("nicknameButton")
  .addEventListener("click", onclickNickname);

function onclickNickname() {
  const input = document.getElementById("nicknameInput");
  socket.emit("nickname", input.value);
  hide("nicknameForm");
  show("waiting");
}

socket.on("begin", gameBeginHandler);
socket.on("cancel", cancelHandler);

function gameBeginHandler(word) {
    hide("waiting");
    show("game");
    console.log(word)
}

function cancelHandler() {
  hide("game");
  show("waiting");
}

function hide(id) {
  const div = document.getElementById(id);
  div.classList.add("hide");
}

function show(id) {
  const div = document.getElementById(id);
  div.classList.remove("hide");
}
