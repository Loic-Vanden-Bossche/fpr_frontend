import { Game } from "../../types/Games.ts";

interface Props {
  game: Game
}

export function GamesCard({ game }: Props){
  return <div style={{ backgroundImage: "url(https://medias.flash-player-revival.net/p/" + game.id + ")", background: "red", borderRadius: "16px", width: 164, height: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "end" }}>
    <p style={{ margin: 0 }}>Players : {game.nbMinPlayers} - {game.nbMaxPlayers}</p>
    <p style={{ margin: 0, marginTop: 8, marginBottom: 8 }}>{game.title}</p>
  </div>;
}
