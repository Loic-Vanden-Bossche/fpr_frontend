import { useEffect } from "react";
import { useGetRoomHistoryQuery, useLazyGetRoomHistoryQuery } from "../../api/rooms";
import { Game } from "../../types";
import { cursors, historyStyle, range } from "./Game.style";
import { Room } from "../../types/Room";
import { useGetProfileQuery } from "../../api";

interface Props{
  render: Game|null;
  room: Room;
  onTickClick: (roomId: string, actionId: string) => void
}

export function GameHistory({ render, room, onTickClick }: Props) {
  const { data:histories } = useGetRoomHistoryQuery(room?.id ?? "");
  const { data: me } = useGetProfileQuery();
  const [refetchHistory] = useLazyGetRoomHistoryQuery();
  useEffect(() => { refetchHistory(room?.id); }, [render, refetchHistory, room]);

  if (!histories || (me?.id !== room?.owner.id)) { return null; }

  return <section css={historyStyle}>
    <input type="range"
      css={range}
      min={0}
      step={histories.length ?? 1}
      max={histories.length ?? 1}
      value={histories.length ?? 0}
    />
    <div css={cursors}>
      {histories.map(history => <div
        className={"tick"}
        key={history.id}
        title={history.instruction}
        onClick={() => onTickClick(room?.id, history.id)}
      />)}
      <div />
    </div>
  </section>;

}
