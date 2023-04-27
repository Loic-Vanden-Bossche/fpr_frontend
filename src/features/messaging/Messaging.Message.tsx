import {Contact, Message} from "../../types";
import {chatMessage, receivedMessage} from "./Messaging.style.ts";
import {inPrimaryShadowSmall, outWhiteShadow} from "../../ui/shadows.ts";

interface Props {
  message: Message;
  contact: Contact;
}

export function MessagingMessage({message, contact}: Props) {
  const isReceivedMessage = message.sender === contact.name;
  const classes = [chatMessage, isReceivedMessage ? receivedMessage : "", isReceivedMessage ? inPrimaryShadowSmall : outWhiteShadow];
  return <li css={classes}>{message.content}</li>
}