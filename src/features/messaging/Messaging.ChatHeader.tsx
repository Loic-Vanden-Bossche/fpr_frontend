import { Group } from "../../types";
import { chatHeader, chatProfilePic } from "./Messaging.style.ts";
import { outWhiteShadow } from "../../ui";

interface Props {
  contact: Group;
}

export function MessagingChatHeader({ contact }: Props) {
  return <header css={chatHeader}>
    <img
      src={"https://api.dicebear.com/6.x/notionists-neutral/svg?seed=Jon"}
      alt={`${contact.name} profile pic`}
      css={[chatProfilePic, outWhiteShadow]}
    />
    <h1>{contact.name}</h1>
  </header>;
}
