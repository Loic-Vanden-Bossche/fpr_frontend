import {Contact} from "../../types";
import {linearCell, profilePic} from "./Messaging.style.ts";

interface Props {
  contact: Contact;
}

export function MessagingContactCell({contact}: Props) {
  return <li css={linearCell}>
    <img css={profilePic} src={contact.profilePic} alt={`${contact.name} profile pic`}/>
    <p>{contact.name}</p>
  </li>
}