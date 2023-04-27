import {Contact, Message} from "../../types";
import {chatMessage, receivedMessage} from "./Messaging.style.ts";
import {outWhiteShadow} from "../../ui/shadows.ts";

interface Props {
  message: Message;
  contact: Contact;
}

export function MessagingMessage({message, contact}: Props) {
  const classes = [chatMessage, outWhiteShadow, message.sender === contact.name ? receivedMessage : ""]
  return <li css={classes}>{message.content}</li>
}