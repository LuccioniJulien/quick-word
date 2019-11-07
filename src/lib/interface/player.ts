import { Socket } from "socket.io";

export default interface Player {
  id: string;
  socket: Socket;
  nickname: string;
}
