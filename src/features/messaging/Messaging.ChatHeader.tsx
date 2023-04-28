import {Contact} from "../../types";
import {chatHeader, chatProfilePic} from "./Messaging.style.ts";
import {outWhiteShadow} from "../../ui/shadows.ts";

interface Props {
  contact: Contact;
}

export function MessagingChatHeader({contact}: Props) {
  return <header css={chatHeader}>
    <img src={contact.profilePic} alt={`${contact.name} profile pic`} css={[chatProfilePic, outWhiteShadow]}/>
    <h1>{contact.name}</h1>
  </header>;
}