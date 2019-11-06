import socketio, { Socket, Room } from "socket.io";
import RoomManager from "../lib/roomManager";
import { info, warning } from "../lib";
var randomWords = require("random-words");

const io = socketio();
const manager = new RoomManager();

io.on("connection", socketConnectionHandler);

function socketConnectionHandler(socket: Socket) {
  info(`${socket.id} has join the server`);

  handleNickname(socket);
  handleWin(socket)

  socket.on("disconnect", () => handleDisconnect(socket));
}

function handleNickname(socket: Socket) {
  socket.on("nickname", nickname => {
    info(`${socket.id} is now ${nickname}`);

    const room = manager.add({ id: socket.id, socket, nickname });
    const roomName = room.id;
    socket.join(roomName);

    // fire the start when room is full
    if (room.count === 2) {
      io.to(roomName).emit("begin", {
        players: room.getPlayers(),
        word: randomWords()
      });
    }
  });
}

function handleWin(socket: Socket) {
  socket.on("win", () => {
    const room = manager.findRoomByPlayerId(socket.id);
    const player = manager.findPlayerById(socket.id);
    if (room && !room.isGameFinished && player) {
      room.isGameFinished = true;
      io.to(room.id).emit("finish", player.nickname);
      manager.delete(room.id);
    }
  });
}

function handleDisconnect(socket: Socket) {
  const room = manager.findRoomByPlayerId(socket.id);
  manager.remove(socket.id);
  if (room) {
    io.to(room.id).emit("cancel", "word");
  }
}

export default io;
