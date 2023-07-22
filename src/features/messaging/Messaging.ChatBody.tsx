import { Message, Profile } from "../../types";
import { MessagingMessage } from "./Messaging.Message.tsx";
import { chatMessageContainer } from "./Messaging.style.ts";

interface Props {
  messages: Message[];
  self: Profile;
}

export function MessagingChatBody({ messages, self }: Props) {
  return <ul css={chatMessageContainer}>
    {messages.map((message, index) =>
      <MessagingMessage message={message} self={self} key={index}/>
    )}
  </ul>;
}
