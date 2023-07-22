import { Message, Profile } from "../../types";
import { chatMessage, receivedMessage } from "./Messaging.style.ts";
import { inPrimaryShadowSmall, outWhiteShadow } from "../../ui";
import { FormattedDate, FormattedTime } from "react-intl";

interface Props {
  message: Message;
  self: Profile;
}

export function MessagingMessage({ message, self }: Props) {
  const isReceivedMessage = message.user.id !== self.id;
  const classes = [
    chatMessage,
    isReceivedMessage ? "" : receivedMessage,
    isReceivedMessage ? outWhiteShadow : inPrimaryShadowSmall
  ];
  return <li css={classes}>
    <span>
      {message.user.nickname} - <FormattedDate value={message.createdAt}/> <FormattedTime value={message.createdAt}/>
    </span><br/>
    {message.message}
  </li>;
}
