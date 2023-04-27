import {Contact} from "../../types";
import {linearCell, profilePic} from "./Messaging.style.ts";

interface Props {
  isSelected: boolean;
  contact: Contact;
  onClick: () => void;
}

export function MessagingContactCell({contact, isSelected, onClick}: Props) {
  const classes = [linearCell];

  return <li css={classes} className={isSelected ? "selected" : ""} onClick={onClick} >
    <img css={profilePic} src={contact.profilePic} alt={`${contact.name} profile pic`}/>
    <p>{contact.name}</p>
  </li>
}