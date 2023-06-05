import type { Contact } from "../../types";
import { MessagingContactCell } from "./Messaging.ContactCell.tsx";
import { contactList } from "./Messaging.style.ts";

interface Props {
  selectedContactIndex: number;
  contacts: Contact[];
  onContactClick: (index: number) => void;
}

export function MessagingContactList({
  selectedContactIndex, contacts, onContactClick
}: Props) {
  return <ul css={contactList}>
    {contacts.map(
      (contact, index) =>
        <MessagingContactCell
          key={index}
          isSelected={index === selectedContactIndex}
          contact={contact}
          onClick={() => onContactClick(index)}
        />
    )}
  </ul>;

}
