import { Games } from "./Games.ts";

export type Room = {
  id: string,
  status: string,
  players: RoomPlayer[],
  invitationStatus: string,
  game: Games
}

export type RoomPlayer = {
  id: string,
  nickname: string,
  picture: boolean
}
