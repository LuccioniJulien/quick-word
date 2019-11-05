import socketio, { Socket, Room } from "socket.io";
import RoomManager from "../lib/roomManager";
import { info, warning } from "../lib";

const io = socketio();
const manager = new RoomManager();

io.on("connection", socketConnectionHandler);

function socketConnectionHandler(socket: Socket) {
  info(`${socket.id} has join the server`);
  socket.on("nickname", nickname => {
    info(`${socket.id} is now ${nickname}`);
    const room = manager.add({ id: socket.id, socket, nickname });
    const roomName = room.id;
    socket.join(roomName);

    // fire the start when room is full
    if (room.count === 2) {
      io.to(roomName).emit("begin", { players: room.getPlayers() });
    }
  });

  socket.on("disconnect", () => handleDisconnect(socket));
}

function handleDisconnect(socket: Socket) {
  const room = manager.findRoomByPlayerId(socket.id);
  manager.remove(socket.id);
  if (room) {
    io.to(room.id).emit("cancel", "word");
  }
}

export default io;
