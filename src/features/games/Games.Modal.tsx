import { css } from "@emotion/react";
import { GamesSearchBar } from "./Games.SearchBar.tsx";
import { useState } from "react";
import { GamesGames } from "./Games.Games.tsx";
import { modal, visible } from "./Games.style.ts";
import { Group } from "../../types";
import { GamesRooms } from "./Games.Rooms.tsx";

interface Props{
  show: boolean;
  group: Group;
}

export function GamesModal({ show, group }: Props){
  const [search, setSearch] = useState("");

  return <section css={css(modal, show && visible)}>
    <GamesSearchBar value={search} onChange={s => setSearch(s)}/>
    <GamesRooms search={search} show={show}/>
    <GamesGames group={group} search={search}/>
  </section>;
}
