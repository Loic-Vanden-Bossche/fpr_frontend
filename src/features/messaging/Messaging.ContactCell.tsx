import { Group } from "../../types";
import { outPrimaryFilter, outPrimaryShadow } from "../../ui/shadows.ts";
import { MessagingContactPicture } from "./Messaging.ContactPicture.tsx";
import { linearCell } from "./Messaging.style.ts";

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
    <MessagingContactPicture group={contact} shadow={outPrimaryFilter}/>
    <p>{contact.name}</p>
  </li>;
}
