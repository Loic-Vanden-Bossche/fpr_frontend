import { Data } from "../lib/index.ts";
import { Profile } from "./Profile.ts";

export type MinimalGames = {
  title: string;
  nbMinPlayers: number;
  nbMaxPlayers: number;
  isDeterministic: boolean;
}

export const isMinimalGames = (data: Data): data is MinimalGames =>
  ("title" in data && typeof data.title === "string") &&
  ("nbMinPlayers" in data && typeof data.nbMinPlayers === "number") &&
  ("nbMaxPlayers" in data && typeof data.nbMaxPlayers === "number");

export interface Games extends MinimalGames{
  id: string,
  owner: Profile,
  picture: boolean,
  isPublic: boolean,
  lastBuildDate: Date | null,
}
