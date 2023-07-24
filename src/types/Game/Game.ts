import { Action, Display, State } from ".";

export type Game = {
  display?: Display;
  requestedActions: Action[];
  gameState: State;
}
