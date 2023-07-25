import { RoomPlayer } from "../../types/Room.ts";
import { leaderBoard } from "./Game.style.ts";

interface Props {
  scores: Record<string, number>,
  players: RoomPlayer[]
}

export function GamesLeaderBoard({ scores, players }: Props) {
  return <div css={leaderBoard}>
    {Object.keys(scores).sort((k1, k2) => scores[k1] - scores [k2]).map(v => {
      const player = players.find(p => p.user.id === v);
      return <div key={v}>
        <img src={player?.user.picture? `https://medias.flash-player-revival.net/p/${player?.user?.id}` :
          `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${player?.user?.id}`}
        />
        <p>{player?.user?.nickname}: {scores[v]}</p>
      </div>;
    })}
  </div>;
}
