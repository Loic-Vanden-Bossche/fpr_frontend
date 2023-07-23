import { css } from "@emotion/react";
import { Game } from "../../types/Games.ts";
import { gameCard } from "./Games.style.ts";
import { outWhiteShadow } from "../../ui/shadows.ts";

interface Props {
  game: Game
}

export function GamesCard({ game }: Props){
  return <div css={css(gameCard(game.id), outWhiteShadow)}>
    <h2>{game.title}</h2>
    <p>Players : {game.nbMinPlayers} - {game.nbMaxPlayers}</p>
  </div>;
}
