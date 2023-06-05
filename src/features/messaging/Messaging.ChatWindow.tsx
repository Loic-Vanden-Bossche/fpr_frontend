import { Contact, getDummyMessages } from "../../types";
import { MessagingChatHeader } from "./Messaging.ChatHeader.tsx";
import { messagingChat } from "./Messaging.style.ts";
import { MessagingChatBody } from "./Messaging.ChatBody.tsx";
import { outPrimaryShadowSmall } from "../../ui";
import { MessagingChatInput } from "./Messaging.ChatInput.tsx";

interface Props {
  contact: Contact;
}

export function MessagingChatWindow({ contact }: Props) {
  const classes = [messagingChat, outPrimaryShadowSmall];
  const messagesList = getDummyMessages();

  return <section css={classes}>
    <MessagingChatHeader contact={contact} />
    <MessagingChatBody messages={messagesList} contact={contact} />
    <MessagingChatInput contact={contact} />
  </section>;
}
