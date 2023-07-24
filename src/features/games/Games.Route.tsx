import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";
import { IMessage } from "@stomp/stompjs";
import { useGetRoomQuery } from "../../api/rooms.ts";
import toast from "react-hot-toast";
import { useGetProfileQuery } from "../../api";
import { Game2DEngine } from "../game/Game.2DEngine.tsx";
import { Game } from "../../types";

export function GamesRoute() {
  const navigate = useNavigate();
  const { id } = useParams();
  const gaming = useContext(gameStompSocket);
  const { data: room } = useGetRoomQuery(id ?? "");
  const { data: self } = useGetProfileQuery();

  useEffect(() => {
    if(!gaming.connected) {
      navigate("/");
    }
  }, [gaming.connected, navigate]);

  const [input, setInput] = useState("");

  const [render, setRender] = useState<object | null>(null);

  const [started, setStarted] = useState(false);

  const [joined, setJoined] = useState(false);

  const [joining, setJoining] = useState(false);

  const onSub = useCallback((message: IMessage) => {
    const data = JSON.parse(message.body);
    if(data.joined === true) {
      toast.success("Joined");
      setJoined(true);
    } else if(data.joined === false) {
      if(!joined) {
        navigate("/");
      }
      toast.error(data.reason);
    } else if(data.started === true) {
      setStarted(true);
      toast.success("Game started");
    } else if(data.started === false) {
      toast.error(data.reason);
    } else {
      setRender(data);
    }
  }, [joined, navigate]);

  useEffect(() => {
    if(!gaming.connected){
      return;
    }
    const sub = [gaming.subscribe("/rooms/" + id, onSub), gaming.subscribe("/rooms/" + id + "/" + self?.id, onSub)];
    if(!joined && !joining) {
      gaming.publish({ destination: "/app/joinRoom/" + id });
      setJoining(true);
    }
    gaming.onConnect = () => {
      gaming.subscribe("/rooms/" + id, onSub);
      gaming.subscribe("/rooms/" + id + "/" + self?.id, onSub);
      if(!joined){
        gaming.publish({ destination: "/app/joinRoom/" + id });
      }
    };
    return () => {
      sub.forEach(s => s.unsubscribe());
    };
  }, [gaming, id, joined, onSub, self]);

  useEffect(() => {
    if(room?.status === "STARTED") {
      setStarted(true);
    }
  }, [room]);

  if(!gaming.connected){
    return null;
  }

  return <section>
    {started ? "Started" : "Not started"}
    <button onClick={() => gaming.publish({ destination: "/app/startGame/" + id })}>Start game</button>
    <input value={input} onChange={e => setInput(e.target.value)}/>
    <button onClick={() => gaming.publish({ destination: "/app/play/" + id, body: input })}>Send input</button>
    {JSON.stringify(render)}
    {render !== null && <Game2DEngine game={render as Game} onAction={(action => gaming.publish({ destination: "/app/play/" + id, body: JSON.stringify(action) }))}/>}
  </section>;
}
