import {Contact, getDummyMessages} from "../../types";
import {MessagingChatHeader} from "./Messaging.ChatHeader.tsx";
import {messagingChat} from "./Messaging.style.ts";
import {MessagingChatBody} from "./Messaging.ChatBody.tsx";

interface Props {
  contact: Contact;
}

export function MessagingChatWindow({contact}: Props) {
  const messagesList = getDummyMessages();

  return <section css={messagingChat}>
    <MessagingChatHeader contact={contact} />
    <MessagingChatBody messages={messagesList} contact={contact} />
  </section>;
}