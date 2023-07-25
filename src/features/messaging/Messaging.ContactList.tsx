import type { Group } from "../../types";
import { MessagingContactCell } from "./Messaging.ContactCell.tsx";
import { contactList } from "./Messaging.style.ts";
import { MessagingAddGroup } from "./Messaging.AddGroup.tsx";
import { useState } from "react";

interface Props {
  selectedContactIndex: number;
  contacts: Group[];
  onContactClick: (index: number) => void;
  reloadGroup: () => void;
}

export function MessagingContactList({
  selectedContactIndex, contacts, onContactClick, reloadGroup
}: Props) {

  const [addGroup, setAddGroup] = useState(false);

  return <ul css={contactList}>
    <button onClick={() => setAddGroup(true)}>+ Add group</button>
    {contacts.map(
      (contact, index) =>
        <MessagingContactCell
          key={index}
          isSelected={index === selectedContactIndex}
          contact={contact}
          onClick={() => onContactClick(index)}
        />
    )}
    {addGroup && <MessagingAddGroup close={() => setAddGroup(false)} reload={reloadGroup}/>}
  </ul>;

}
