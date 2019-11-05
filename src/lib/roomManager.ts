import { Socket } from "socket.io";
import uuidv1 from "uuid/v1";

export default class RoomManager {
  rooms: Array<Room> = [];

  add(player: Player): Room {
    const room = this.rooms.find(r => r.count < 2) || new Room();
    room.add(player);
    this.rooms.push(room);
    return room;
  }

  // remove player from the room
  remove(id: string) {
    const room = this.rooms.find(r => r.contain(id));
    if (room) {
      room.remove(id);
      // remove empty room
      if (room.count == 0) {
        this.rooms = this.rooms.filter(r => r.id !== room.id);
      }
    }
  }

  find(uuid: string) {
    return this.rooms.find(r => r.id === uuid);
  }

  findRoomByPlayerId(idPlayer: string): Room | undefined {
    return this.rooms.find(r => r.contain(idPlayer));
  }

  findPlayerById(id: string): Player | undefined {
    const room = this.rooms.find(r => r.contain(id));
    if (!room) {
      return undefined;
    }
    return room.find(id);
  }
}

class Room {
  players: Array<Player> = [];
  count: number = 0;
  id: string = "";

  // set the id of the room which will be used as name for room in socket.io
  constructor() {
    this.id = uuidv1();
  }

  add(player: Player): void {
    if (this.count === 2) {
      throw "Room is full";
    }
    this.players.push(player);
    this.count++;
  }

  contain(id: string): boolean {
    return this.players.some(p => p.id === id);
  }

  find(id: string): Player | undefined {
    return this.players.find(p => p.id === id);
  }

  remove(id: string): void {
    if (this.count === 0) {
      throw "Room is empty";
    }
    this.players = this.players.filter(p => p.id !== id);
    this.count--;
  }

  isFull(): boolean {
    return this.players.length === 2;
  }

  getPlayers(): { first: string; second: string } {
    const [one, two] = this.players;
    return {
      first: one.nickname,
      second: two.nickname
    };
  }
}

interface Player {
  id: string;
  socket: Socket;
  nickname: string;
}
