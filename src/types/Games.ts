import { Profile } from "./Profile.ts";

export type Game = {
  id: string,
  title: string,
  owner: Profile,
  picture: boolean,
  nbMinPlayers: number,
  nbMaxPlayers: number,
  isDeterministic: boolean,
  isPublic: boolean,
  lastBuildDate?: string,
}
