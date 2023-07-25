import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";
import { IMessage } from "@stomp/stompjs";
import { useGetRoomQuery } from "../../api/rooms.ts";
import toast from "react-hot-toast";
import { useGetProfileQuery } from "../../api/index.ts";
import { Game2DEngine } from "./Game.2DEngine.tsx";
import { css } from "@emotion/react";
import { gameDisplay, linearLayout } from "./Game.style.ts";
import { outPrimaryShadow } from "../../ui/shadows.ts";
import { GameStartScreen } from "./Game.StartScreen.tsx";
import { Game } from "../../types";
import { GameChat } from "./Game.Chat.tsx";
import { GamesLeaderBoard } from "./Games.LeaderBoard.tsx";

export function GameRoute() {
  const navigate = useNavigate();
  const { id } = useParams();
  const gaming = useContext(gameStompSocket);
  const { data: room } = useGetRoomQuery(id ?? "");
  const { data: self } = useGetProfileQuery();

  useEffect(() => {
    if(!gaming.connected) {
      gaming.activate();
    }
  }, [gaming, navigate]);

  const [render, setRender] = useState<Game | null>(null);

  const [started, setStarted] = useState(false);
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  const onSub = useCallback((message: IMessage) => {
    const data = JSON.parse(message.body);
    if(data.joined === true) {
      toast.success("Joined");
      setJoined(true);
    }
    else if(data.joined === false) {
      if(!joined) {
        navigate("/");
      }
      toast.error(data.reason);
    }
    else if(data.started === true) {
      setStarted(true);
      toast.success("Game started");
    }
    else if(data.started === false) {
      toast.error(data.reason);
    }
    else if(data.played !== undefined) {
      if(!data.played) {
        toast.error(data.reason);
      }
    }
    else if(data.closed !== undefined){
      if(data.closed){
        toast("Closed", {
          icon: "⚠️"
        });
      }
      else {
        toast.error("Error on closing: " + data.reason);
      }
      navigate("/");
    }
    else if(data.paused !== undefined){
      if(data.paused){
        toast("Paused", { icon: "⏸️" });
      }
      else {
        toast.error("Error on pause: " + data.reason);
      }
      navigate("/");
    }
    else {
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
      if(!joined && ! joining){
        gaming.publish({ destination: "/app/joinRoom/" + id });
        setJoining(true);
      }
    };
    return () => {
      sub.forEach(s => s.unsubscribe());
    };
  }, [gaming, gaming.connected, id, joined, joining, onSub, self]);

  useEffect(() => {
    if(room?.status === "STARTED") {
      setStarted(true);
    }
  }, [room]);

  useEffect(() => {
    const score = render?.gameState?.scores;
    if(render?.gameState?.gameOver === true && score !== undefined) {
      if(Object.values(score).reduce((prev, current) => current > prev ? current : prev ) === score[self?.id ?? ""]){
        navigate("/win");
      }else{
        navigate("/loose");
      }
    }
  }, [navigate, render, self]);

  if(!gaming.connected){
    return null;
  }

  return <div css={linearLayout}>
    <section css={css(gameDisplay, outPrimaryShadow)}>
      <GamesLeaderBoard scores={render?.gameState?.scores ?? {}} players={room?.players ?? []}/>
      <button onClick={() => gaming.publish({ destination: "/app/stopGame/" + id })}>Stop</button>
      <button onClick={() => gaming.publish({ destination: "/app/pauseGame/" + id })}>Pause</button>
      {!(started && render)
        && <GameStartScreen isStarted={started} handleStartClick={() => gaming.publish({ destination: "/app/startGame/" + id })} />
      }
      {(started && render)&& <Game2DEngine
        game={render as Game}
        onAction={(action => gaming.publish({ destination: "/app/play/" + id, body: JSON.stringify(action) }))}
      />}
    </section>
    {!!room && <GameChat group={room.group}/>}
  </div>;
}
