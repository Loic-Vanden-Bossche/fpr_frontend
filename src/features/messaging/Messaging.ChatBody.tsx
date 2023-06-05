import { Message, Contact } from "../../types";
import { MessagingMessage } from "./Messaging.Message.tsx";
import { chatMessageContainer } from "./Messaging.style.ts";

interface Props {
  messages: Message[];
  contact: Contact;
}

export function MessagingChatBody({ messages, contact }: Props) {
  return <ul css={chatMessageContainer}>
    {messages.map((message, index) =>
      <MessagingMessage message={message} contact={contact} key={index}/>
    )}
  </ul>;
}
