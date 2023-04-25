import type {Contact} from "../../types";
import {MessagingContactCell} from "./Messaging.ContactCell.tsx";
import {contactList} from "./Messaging.style.ts";

interface Props {
  contacts: Contact[];
}

export function MessagingContactList({contacts}: Props) {
  return <ul css={contactList}>
    {contacts.map((contact, index) => <MessagingContactCell key={index} contact={contact} />)}
  </ul>;

}