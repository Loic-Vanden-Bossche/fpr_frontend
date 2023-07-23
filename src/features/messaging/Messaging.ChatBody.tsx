import { Message, Profile } from "../../types";
import { MessagingMessage } from "./Messaging.Message.tsx";
import { chatMessageContainer } from "./Messaging.style.ts";
import { useEffect, useRef } from "react";

interface Props {
  messages: Message[];
  self: Profile;
  onTop: () => void;
}

export function MessagingChatBody({ messages, self, onTop }: Props) {
  const container = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const c = container.current;
    if(c !== null){
      c.onscroll = () => {
        if(c.offsetHeight - c.scrollTop + 50 >= c.scrollHeight){
          onTop();
        }
      };
      return () => {
        c.onscroll = null;
      };
    }
  }, [container, onTop]);

  return <ul css={chatMessageContainer} ref={container}>
    {messages.map((message, index) =>
      <MessagingMessage message={message} self={self} key={index}/>
    )}
  </ul>;
}
