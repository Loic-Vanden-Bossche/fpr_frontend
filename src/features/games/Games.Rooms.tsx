import { useGetRoomsQuery, useLazyGetRoomsQuery } from "../../api/rooms.ts";
import { gamesStyle } from "../../ui/games.ts";
import { RoomsCard } from "./Rooms.Card.tsx";
import { useEffect } from "react";

interface Props {
  search: string;
  show: boolean;
}

export function GamesRooms({ search, show }: Props) {
  const { data: rooms } = useGetRoomsQuery();
  const [reload] = useLazyGetRoomsQuery();

  useEffect(() => {
    reload();
  }, [reload, show]);

  const searchRegex = new RegExp(search, "i");

  return <div css={gamesStyle}>
    {rooms?.filter(r => searchRegex.test(r.game.title))?.map((r, i) => <RoomsCard key={i} room={r}/>)}
  </div>;
}
