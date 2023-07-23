import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";
import { IMessage } from "@stomp/stompjs";
import { useGetRoomQuery } from "../../api/rooms.ts";
import toast from "react-hot-toast";

export function GamesRoute() {
  const navigate = useNavigate();
  const { id } = useParams();
  const gaming = useContext(gameStompSocket);
  const { data: room } = useGetRoomQuery(id ?? "");

  useEffect(() => {
    if(!gaming.connected) {
      navigate("/");
    }
  }, [gaming.connected, navigate]);

  const [input, setInput] = useState("");

  const [render, setRender] = useState("");

  const [started, setStarted] = useState(false);

  const onSub = useCallback((message: IMessage) => {
    const data = JSON.parse(message.body);
    if(data.joined === true) {
      toast.success("Joined");
    } else if(data.joined === false) {
      toast.error(data.reason);
    } else if(data.started === true) {
      setStarted(true);
      toast.success("Game started");
    } else if(data.started === false) {
      toast.error(data.reason);
    } else {
      setRender(data);
    }
  }, []);

  useEffect(() => {
    const sub = gaming.subscribe("/rooms/" + id, onSub);
    gaming.onConnect = () => {
      gaming.subscribe("/rooms/" + id, onSub);
    };
    return () => {
      sub.unsubscribe();
    };
  }, [gaming, id, onSub]);

  useEffect(() => {
    if(room?.status === "STARTED") {
      setStarted(true);
    }
  }, [room]);

  return <section>
    {started ? "Started" : "Not started"}
    <button onClick={() => gaming.publish({ destination: "/app/startGame/" + id })}>Start game</button>
    <input value={input} onChange={e => setInput(e.target.value)}/>
    <button onClick={() => gaming.publish({ destination: "/app/play/" + id, body: input })}>Send input</button>
    {render}
    {/*<Game2DEngine displayData={render !== "" ? JSON.parse(render) : ""}/>*/}
  </section>;
}
