import { gamesStyle } from "../../ui/games.ts";
import { RoomsCard } from "./Rooms.Card.tsx";
import { Room } from "../../types/Room.ts";

interface Props {
  search: string;
  rooms?: Room[]
}

export function GamesRooms({ search, rooms}: Props) {

  const searchRegex = new RegExp(search, "i");

  return <div css={gamesStyle}>
    {rooms?.filter(r => searchRegex.test(r.game.title))?.map((r, i) => <RoomsCard key={i} room={r}/>)}
  </div>;
}
