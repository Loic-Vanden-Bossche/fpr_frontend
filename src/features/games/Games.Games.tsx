import { useGetGamesQuery } from "../../api/games.ts";
import { GamesCard } from "./Games.Card.tsx";
import { gamesStyle } from "../../ui/games.ts";

export function GamesGames() {
  const { data: games } = useGetGamesQuery();

  return <div css={gamesStyle}>
    {games?.map((g, i) => <GamesCard key={i} game={g}/>)}
  </div>;
}
