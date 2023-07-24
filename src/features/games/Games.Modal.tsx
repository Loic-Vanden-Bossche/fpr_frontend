import { css } from "@emotion/react";
import { GamesSearchBar } from "./Games.SearchBar.tsx";
import { useEffect, useState } from "react";
import { GamesGames } from "./Games.Games.tsx";
import { modal, visible } from "./Games.style.ts";
import { Group } from "../../types";
import { GamesRooms } from "./Games.Rooms.tsx";
import { useGetRoomsQuery, useLazyGetRoomsQuery } from "../../api/rooms.ts";

interface Props{
  show: boolean;
  group: Group;
}

export function GamesModal({ show, group }: Props){
  const [search, setSearch] = useState("");
  const { data: rooms } = useGetRoomsQuery();
  const [reload] = useLazyGetRoomsQuery();

  useEffect(() => {
    reload();
  }, [reload, show]);

  return <section css={css(modal, show && visible)}>
    <GamesSearchBar value={search} onChange={s => setSearch(s)}/>
    {rooms && rooms.length !== 0 &&
      <><p>Rooms</p><GamesRooms search={search} rooms={rooms}/></>
    }
    <p>Games</p>
    <GamesGames group={group} search={search}/>
  </section>;
}
