import uuidv1 from "uuid/v1";
import Player from "./interface/player";

export default class Room {
  players: Array<Player> = [];
  id: string = "";
  isGameFinished: boolean = false;

  // set the id of the room which will be used as name for room in socket.io
  constructor() {
    this.id = uuidv1();
  }

  count(): number {
    return this.players.length;
  }

  add(player: Player): void {
    if (this.count() === 2) {
      throw "Room is full";
    }
    this.players.push(player);
  }

  contain(id: string): boolean {
    return this.players.some(p => p.id === id);
  }

  find(id: string): Player | undefined {
    return this.players.find(p => p.id === id);
  }

  remove(id: string): void {
    if (this.count() === 0) {
      throw "Room is empty";
    }
    this.players = this.players.filter(p => p.id !== id);
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
