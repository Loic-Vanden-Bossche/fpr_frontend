import { Group } from "../../types";
import { linearCell, profilePic } from "./Messaging.style.ts";

interface Props {
  isSelected: boolean;
  contact: Group;
  onClick: () => void;
}

export function MessagingContactCell({
  contact, isSelected, onClick
}: Props) {
  const classes = [linearCell];

  return <li css={classes} className={isSelected ? "selected" : ""} onClick={onClick} >
    <img css={profilePic} src={"https://api.dicebear.com/6.x/notionists-neutral/svg?seed=Jon"} alt={`${contact.name} profile pic`}/>
    <p>{contact.name}</p>
  </li>;
}
