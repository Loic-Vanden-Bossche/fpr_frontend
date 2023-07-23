/* eslint-disable no-console */
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";
import { IMessage } from "@stomp/stompjs";

export function GamesRoute() {
  const navigate = useNavigate();
  const { id } = useParams();
  const gaming = useContext(gameStompSocket);

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
      console.log("Joined");
    } else if(data.joined === false) {
      console.log("Error", data.reason);
    } else if(data.started === true) {
      setStarted(true);
    } else if(data.started === false) {
      console.log("Error on start", data.reason);
    } else {
      setRender(data);
    }
  }, []);

  useEffect(() => {
    console.log("sub", id);
    const sub = gaming.subscribe("/rooms/" + id, onSub);
    gaming.onConnect = () => {
      console.log("onconnect sub");
      gaming.subscribe("/rooms/" + id, onSub);
    };
    return () => {
      sub.unsubscribe();
    };
  }, [gaming, id, onSub]);

  return <section>
    {started ? "Started" : "Not started"}
    <button onClick={() => gaming.publish({ destination: "/app/startGame/" + id })}>Start game</button>
    <input value={input} onChange={e => setInput(e.target.value)}/>
    <button onClick={() => gaming.publish({ destination: "/app/play/" + id, body: input })}>Send input</button>
    {render}
    {/*<Game2DEngine displayData={render !== "" ? JSON.parse(render) : ""}/>*/}
  </section>;
}
