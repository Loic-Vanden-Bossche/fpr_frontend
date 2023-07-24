import { Room } from "../../types/Room.ts";
import { css, jsx } from "@emotion/react";
import { gameCard, gameLoading } from "./Games.style.ts";
import { outWhiteShadow } from "../../ui";
import { useContext, useState } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";
import { useNavigate } from "react-router-dom";
import { icons } from "../../lib";
import JSX = jsx.JSX;
import toast from "react-hot-toast";

interface Props {
  room: Room
}

export function RoomsCard({ room }: Props) {
  const gaming = useContext(gameStompSocket);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  let status: JSX.Element;
  if(room.status === "STARTED") {
    status = icons.play;
  }
  else if(room.status === "WAITING"){
    status = icons.wait;
  }
  else if(room.status === "PAUSED"){
    status = icons.pause;
  }
  else {
    status = <p/>;
  }

  return <div css={css(gameCard(room.game.id), outWhiteShadow)} onClick={() => {
    if(!loading) {
      setLoading(true);
      if (gaming.connected) {
        gaming.forceDisconnect();
      }
      if(room.status !== "PAUSED") {
        gaming.onConnect = () => {
          setLoading(false);
          navigate("/room/" + room.id);
        };
      }
      else {
        gaming.onConnect = () => {
          gaming.subscribe("/rooms/" + room.id, message => {
            const response = JSON.parse(message.body);
            if (response.resumed) {
              navigate("/room/" + room.id);
            }
            else {
              toast.error(response.reason);
            }
          });
          gaming.publish({ destination: "/app/resumeGame/" + room.id });
        };
      }
      gaming.activate();
    }
  }}>
    <p style={{ position: "absolute", top: "8px", right: "8px" }}>{status}</p>
    <h2>{room.game.title}</h2>
    <p>Players : {room.players.length}</p>
    {loading && <div css={gameLoading}><div/></div>}
  </div>;
}
