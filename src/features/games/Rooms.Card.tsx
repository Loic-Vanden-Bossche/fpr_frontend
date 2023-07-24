import { Room } from "../../types/Room.ts";
import { css, jsx } from "@emotion/react";
import { gameCard } from "./Games.style.ts";
import { outWhiteShadow } from "../../ui";
import { useContext } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";
import { useNavigate } from "react-router-dom";
import { icons } from "../../lib";
import JSX = jsx.JSX;

interface Props {
  room: Room
}

export function RoomsCard({ room }: Props) {
  const gaming = useContext(gameStompSocket);
  const navigate = useNavigate();

  let status: JSX.Element;
  if(room.status === "STARTED") {
    status = icons.play;
  } else if(room.status === "WAITING"){
    status = icons.wait;
  } else {
    status = <p/>;
  }

  return <div css={css(gameCard(room.game.id), outWhiteShadow)} onClick={() => {
    gaming.onConnect = () => {
      navigate("/room/" + room.id);
    };
    gaming.activate();
  }}>
    <p style={{ position: "absolute", top: "8px", right: "8px" }}>{status}</p>
    <h2>{room.game.title}</h2>
    <p>Players : {room.players.length}</p>
  </div>;
}
