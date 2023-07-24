import { Games } from "./Games.ts";
import { Group } from "./Group.ts";
import { Profile } from "./Profile.ts";

export type Room = {
  id: string,
  status: string,
  players: RoomPlayer[],
  invitationStatus: string,
  group: Group,
  game: Games
}

export type RoomPlayer = {
  id: string,
  user: Profile
}
