import { gameExample } from "../../types";
import { Game2DEngine } from "./Game.2DEngine";

export function GameRoute() {
  return <Game2DEngine game={gameExample}/>;
}
