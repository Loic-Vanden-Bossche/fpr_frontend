import { section } from "../friends/Friends.style.ts";
import { useState } from "react";
import { GamesModal } from "./Games.Modal.tsx";
import { GamesToogleButton } from "./Games.ToogleButton.tsx";

export function GamesRoute() {
  const [showGames, setShowGames] = useState(false);

  return <section css={section(showGames)}>
    <GamesToogleButton isActive={showGames} onClick={() => setShowGames(prev => !prev)}/>
    <GamesModal show={showGames}/>
  </section>;
}
