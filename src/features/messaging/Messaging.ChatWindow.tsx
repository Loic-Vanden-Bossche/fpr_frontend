import { Group, Profile } from "../../types";
import { MessagingChatHeader } from "./Messaging.ChatHeader.tsx";
import { messagingChat } from "./Messaging.style.ts";
import { MessagingChatBody } from "./Messaging.ChatBody.tsx";
import { outPrimaryShadowSmall } from "../../ui";
import { MessagingChatInput } from "./Messaging.ChatInput.tsx";
import { useGetGroupMessageQuery } from "../../api";

interface Props {
  group: Group;
  self: Profile
}

export function MessagingChatWindow({ group, self }: Props) {
  const classes = [messagingChat, outPrimaryShadowSmall];
  const { data: messages } = useGetGroupMessageQuery(group.id);

  return <section css={classes}>
    <MessagingChatHeader contact={group} />
    <MessagingChatBody messages={messages ?? []} self={self} />
    <MessagingChatInput group={group} />
  </section>;
}
