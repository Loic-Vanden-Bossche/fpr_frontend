import { useGetMyGamesQuery } from "../../api/games";
import { AccountGamesListCard } from "./Account.GamesListCard";
import { gamesList } from "./Account.style";

export function AccountGamesList() {
  const { data, isLoading } = useGetMyGamesQuery();

  if(isLoading) { return <p>We are loading your game list please wait</p>; }
  if(!data) { return <p>Sorry we can't retrieve your games please retry later</p>; }
  if(!data.length) { return <p>You don't have any game at the moment</p>; }
  return <ul css={gamesList}>
    {data.map(game => <AccountGamesListCard key={game.id} game={game}/>)}
  </ul>;
}
