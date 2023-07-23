import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";

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

  useEffect(() => {
    gaming.subscribe("/rooms/" + id, message => {
      setRender(message.body);
    });
    gaming.onConnect = () => {
      gaming.subscribe("/rooms/" + id, message => {
        setRender(message.body);
      });
    };
  }, [gaming, id]);

  return <section>
    <button onClick={() => gaming.publish({ destination: "/app/startGame/" + id })}>Start game</button>
    <input value={input} onChange={e => setInput(e.target.value)}/>
    <button onClick={() => gaming.publish({ destination: "/app/play/" + id, body: input })}>Send input</button>
    {render}
    {/*<Game2DEngine displayData={render !== "" ? JSON.parse(render) : ""}/>*/}
  </section>;
}
