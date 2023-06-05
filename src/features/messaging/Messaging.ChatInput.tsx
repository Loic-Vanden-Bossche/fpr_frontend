import { chatInput } from "./Messaging.style.ts";
import { Contact } from "../../types";
import { inWhiteShadow } from "../../ui";

interface Props {
  contact: Contact;
}

export function MessagingChatInput({ contact }: Props) {
  const classes = [chatInput, inWhiteShadow];
  return <textarea css={classes} placeholder={`Send a message to ${contact.name}`}/>;
}
