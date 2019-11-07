import Player from "./interface/player";
import Room from "./room";

export default class RoomManager {
  rooms: Array<Room> = [];

  add(player: Player): Room {
    const room = this.rooms.find(r => r.count() < 2) || new Room();
    room.add(player);
    this.rooms.push(room);
    return room;
  }

  delete(uuid: string) {
    this.rooms = this.rooms.filter(r => r.id !== uuid);
  }
  // remove player from the room
  remove(id: string) {
    const room = this.rooms.find(r => r.contain(id));
    if (room) {
      room.remove(id);
      // remove empty room
      if (room.count() == 0) {
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
