import { css } from "@emotion/react";
import { Games } from "../../types";
import { Button, outWhiteShadow } from "../../ui";
import { gameCard } from "./Account.style";
import { AccountGamePicture } from "./Account.GamePicture";
import { useDeleteGameMutation } from "../../api/games";
import { AccountGameBuild } from "./Account.GameBuild";

interface Props {
  game: Games
}

export function AccountGamesListCard({ game }: Props) {
  const [deleteGame] = useDeleteGameMutation();

  const handleDeleteClick = () => deleteGame(game.id);

  return <li css={css(outWhiteShadow, gameCard)}>
    <header>
      <AccountGamePicture game={game}/>
      <h2>{game.title}</h2>
    </header>
    <footer>
      <AccountGameBuild game={game}/>
      <Button onClick={handleDeleteClick}>Delete</Button>
    </footer>
  </li>;
}
