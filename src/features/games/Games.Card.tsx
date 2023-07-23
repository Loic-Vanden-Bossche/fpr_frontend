import { css } from "@emotion/react";
import { gameCard, gameLoading } from "./Games.style.ts";
import { Games } from "../../types/Games.ts";
import { outWhiteShadow } from "../../ui";
import { useContext, useState } from "react";
import { gameStompSocket } from "../../ws/gaming.ts";
import { Group } from "../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  game: Games,
  group: Group
}

export function GamesCard({ game, group }: Props){
  const gaming = useContext(gameStompSocket);

  const navigator = useNavigate();

  const [creating, setCreating] = useState(false);

  return <div css={css(gameCard(game.id), outWhiteShadow)}
    onClick={() => {
      gaming.onConnect = () => {
        gaming.subscribe("/rooms/created", message => {
          const response = JSON.parse(message.body);
          if(response.created){
            navigator("/room/" + response.id);
          }
          else {
            toast.error(response.reason);
          }
        });
        if(!creating) {
          setCreating(true);
          gaming.publish({
            destination: "/app/createRoom",
            body: JSON.stringify({ gameId: game.id, groupId: group.id })
          });
        }
      };
      gaming.activate();
    }}
  >
    <h2>{game.title}</h2>
    <p>Players : {game.nbMinPlayers} - {game.nbMaxPlayers}</p>
    {creating && <div css={gameLoading}><div/></div>}
  </div>;
}
