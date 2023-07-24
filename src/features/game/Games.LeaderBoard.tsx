import { RoomPlayer } from "../../types/Room.ts";

interface Props {
  scores: Record<string, number>,
  players: RoomPlayer[]
}

export function GamesLeaderBoard({ scores, players }: Props) {
  return <div>
    {Object.keys(scores).sort((k1, k2) => scores[k1] - scores [k2]).map(v => {
      const player = players.find(p => p.user.id === v);
      return <p key={v}><span>{player?.user?.nickname}</span>: <span>{scores[v]}</span></p>;
    })}
  </div>;
}
