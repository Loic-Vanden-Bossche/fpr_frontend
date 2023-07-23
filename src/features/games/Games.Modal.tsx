import { css } from "@emotion/react";
import { GamesSearchBar } from "./Games.SearchBar.tsx";
import { useState } from "react";
import { GamesGames } from "./Games.Games.tsx";
import { modal, visible } from "./Games.style.ts";

interface Props{
  show: boolean;
}

export function GamesModal({ show }: Props){
  const [search, setSearch] = useState("");

  return <section css={css(modal, show && visible)}>
    <GamesSearchBar value={search} onChange={s => setSearch(s)}/>
    <GamesGames/>
  </section>;
}
