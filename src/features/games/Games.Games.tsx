import { useGetGamesQuery } from "../../api/games.ts";
import { GamesCard } from "./Games.Card.tsx";
import { gamesStyle } from "../../ui/games.ts";
import { Group } from "../../types";

interface Props {
  group: Group,
  search: string
}

export function GamesGames({ group, search }: Props) {
  const { data: games } = useGetGamesQuery();

  const searchRegex = new RegExp(search, "i");

  return <div css={gamesStyle}>
    {games?.filter(g => searchRegex.test(g.title))?.map((g, i) => <GamesCard key={i} game={g} group={group}/>)}
  </div>;
}
