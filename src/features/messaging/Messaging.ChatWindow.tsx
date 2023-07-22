import { Group, Message, Profile } from "../../types";
import { MessagingChatHeader } from "./Messaging.ChatHeader.tsx";
import { messagingChat } from "./Messaging.style.ts";
import { MessagingChatBody } from "./Messaging.ChatBody.tsx";
import { outPrimaryShadowSmall } from "../../ui";
import { MessagingChatInput } from "./Messaging.ChatInput.tsx";
import { useGetGroupMessageQuery } from "../../api";
import { useContext, useEffect, useState } from "react";
import { stompSocket } from "../../ws/messaging.ts";

interface Props {
  group: Group;
  self: Profile
}

export function MessagingChatWindow({ group, self }: Props) {
  const classes = [messagingChat, outPrimaryShadowSmall];
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { data: historyMessages } = useGetGroupMessageQuery({ id: group.id, page: page });
  const stomp = useContext(stompSocket);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([]);
  }, [group.id]);

  useEffect(() => {
    if(historyMessages !== undefined) {
      setMessages(prev => {
        const array = prev.slice(0);
        const ids = array.slice(-historyMessages.length).map(m => m.id);
        array.push(...historyMessages.filter(m => !ids.includes(m.id)));
        return array;
      });
      setLoading(false);
    }
  }, [historyMessages]);

  useEffect(() => {
    const s = stomp.subscribe("/groups/" + group.id + "/messages", message => {
      setMessages(prev => {
        const newMessages = prev.slice(0);
        newMessages.splice(0, 0, JSON.parse(message.body));
        return newMessages;
      });
    });
    return () => {
      s.unsubscribe();
    };
  }, [group.id, stomp]);

  return <section css={classes}>
    <MessagingChatHeader contact={group} />
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
