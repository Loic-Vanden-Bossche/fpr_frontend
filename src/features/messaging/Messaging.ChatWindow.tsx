import { Group, Message, Profile } from "../../types";
import { MessagingChatHeader } from "./Messaging.ChatHeader.tsx";
import { messagingChat } from "./Messaging.style.ts";
import { MessagingChatBody } from "./Messaging.ChatBody.tsx";
import { outPrimaryShadowSmall } from "../../ui";
import { MessagingChatInput } from "./Messaging.ChatInput.tsx";
import { useGetGroupMessageQuery, useGetGroupsQuery, useLazyGetGroupMessageQuery } from "../../api";
import { useCallback, useContext, useEffect, useState } from "react";
import { stompSocket } from "../../ws/messaging.ts";
import { IMessage, StompSubscription } from "@stomp/stompjs";
import { GamesModal } from "../games/Games.Modal.tsx";
import toast from "react-hot-toast";

interface Props {
  group: Group;
  self: Profile
}

export function MessagingChatWindow({ group, self }: Props) {
  const { data } = useGetGroupsQuery();
  const classes = [messagingChat, outPrimaryShadowSmall];
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [showGames, setShowGames] = useState(false);
  const { data: historyMessages } = useGetGroupMessageQuery({ id: group.id, page: page });
  const [reloadMessages] = useLazyGetGroupMessageQuery();
  const stomp = useContext(stompSocket);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([]);
    setPage(0);
    setLoading(true);
    reloadMessages({ id: group.id, page: 0 });
  }, [group.id, reloadMessages]);

  useEffect(() => {
    if(historyMessages !== undefined) {
      setMessages(prev => {
        const array = prev.slice(0);
        const ids = array.slice(-historyMessages.length).map(m => m.id);
        array.push(...historyMessages.filter(m => !ids.includes(m.id)));
        return array;
      });
      if(historyMessages.length > 0){
        setLoading(false);
      }
    }
  }, [historyMessages]);

  const currentSubscribe = useCallback((message: IMessage) => {
    const data = JSON.parse(message.body);
    if(data.type === "NEW"){
      setMessages(prev => {
        const newMessages = prev.slice(0);
        newMessages.splice(0, 0, data);
        return newMessages;
      });
    }
    else if(data.type === "EDIT") {
      setMessages(prev => {
        const newMessages = prev.slice(0);
        const m = newMessages.findIndex(m => m.id === data.id);
        if(m !== -1){
          newMessages[m] = data;
        }
        return newMessages;
      });
    }
    else if(data.type === "DELETE") {
      setMessages(prev => {
        const newMessages = prev.slice(0);
        const m = newMessages.findIndex(m => m.id === data.id);
        if(m !== -1) {
          newMessages.splice(m, 1);
        }
        return newMessages;
      });
    }
  }, []);

  const InitStompSub = useCallback(() => {
    if (data) {
      return data.map((g) => stomp.subscribe("/groups/" + g.id + "/messages", message => {
        if(g.id === group.id){
          currentSubscribe(message);
        }
        else {
          const data = JSON.parse(message.body);
          if (data.type === "NEW") {
            toast( () =>
              <div>
                <p>{g.name}</p>
                <p style={{ width: "100%", textAlign: "end" }}>{data.message}</p>
              </div>
            );
          }
        }
      }));
    }
  }, [currentSubscribe, data, group.id, stomp]);

  useEffect(() => {
    let subs: StompSubscription[] | undefined = undefined;
    stomp.onConnect = () => {
      subs = InitStompSub();
    };
    if(!stomp.connected) {
      stomp.activate();
    } else {
      subs = InitStompSub();
    }
    return () => {
      subs?.forEach(s => s.unsubscribe());
    };
  }, [InitStompSub, stomp]);

  return <section css={classes}>
    <MessagingChatHeader
      contact={group}
      showGames={showGames}
      handleOnShowGamesClick={() => setShowGames(prev => !prev)}
    />
    <GamesModal show={showGames} group={group}/>
    <MessagingChatBody
      messages={messages ?? [] }
      self={self}
      onTop={() => {
        if(!loading) {
          setLoading(true);
          setPage(prev => prev + 1);
        }
      }}
    />
    <MessagingChatInput group={group} />
  </section>;
}
