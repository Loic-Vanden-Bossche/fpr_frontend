import { Data } from "../lib/index.ts";
import { Profile } from "./Profile.ts";

export type MinimalGame = {
  title: string;
  nbMinPlayers: number;
  nbMaxPlayers: number;
  isDeterministic: boolean;
}

export const isMinimalGame = (data: Data): data is MinimalGame =>
  ("title" in data && typeof data.title === "string") &&
  ("nbMinPlayers" in data && typeof data.nbMinPlayers === "number") &&
  ("nbMaxPlayers" in data && typeof data.nbMaxPlayers === "number") &&
  ("isDeterministic" in data && typeof data.isDeterministic === "boolean");

export interface Game extends MinimalGame{
  id: string,
  owner: Profile,
  picture: boolean,
  isPublic: boolean,
  lastBuildDate: Date | null,
}
