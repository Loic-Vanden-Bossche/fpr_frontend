import { useGetRoomsQuery } from "../../api/rooms.ts";
import { gamesStyle } from "../../ui/games.ts";
import { RoomsCard } from "./Rooms.Card.tsx";

interface Props {
  search: string
}

export function GamesRooms({ search }: Props) {
  const { data: rooms } = useGetRoomsQuery();

  const searchRegex = new RegExp(search, "i");

  return <div css={gamesStyle}>
    {rooms?.filter(r => searchRegex.test(r.game.title))?.map((r, i) => <RoomsCard key={i} room={r}/>)}
  </div>;
}
