import { Room } from "../../types/Room.ts";
import { css } from "@emotion/react";
import { gameCard } from "./Games.style.ts";
import { outWhiteShadow } from "../../ui";
import { useContext } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  room: Room
}

export function RoomsCard({ room }: Props) {
  const gaming = useContext(gameStompSocket);
  const navigate = useNavigate();

  return <div css={css(gameCard(room.game.id), outWhiteShadow)} onClick={() => {
    gaming.onConnect = () => {
      gaming.publish({ destination: "/app/joinRoom/" + room.id });
      navigate("/room/" + room.id);
    };
    gaming.activate();
  }}>
    <h2>{room.game.title}</h2>
    <p>Players : {room.players.length}</p>
  </div>;
}
