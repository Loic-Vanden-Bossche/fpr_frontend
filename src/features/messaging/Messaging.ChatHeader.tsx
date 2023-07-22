import { Group } from "../../types";
import { chatHeader } from "./Messaging.style.ts";
import { MessagingContactPicture } from "./Messaging.ContactPicture.tsx";
import { outWhiteFilter } from "../../ui/shadows.ts";

interface Props {
  contact: Group;
}

export function MessagingChatHeader({ contact }: Props) {
  return <header css={chatHeader}>
    <MessagingContactPicture group={contact} shadow={outWhiteFilter}/>
    <h1>{contact.name}</h1>
  </header>;
}
