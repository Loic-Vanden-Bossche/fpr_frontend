import type {Contact} from "../../types";
import {getDummyContacts} from "../../types";
import {MessagingContactList} from "./Messaging.ContactList.tsx";
import {messagingScreen} from "./Messaging.style.ts";

export function MessagingRoute() {
    const contactList: Contact[] = [getDummyContacts(), getDummyContacts(), getDummyContacts()];
    return <main css={messagingScreen}>
        <MessagingContactList contacts={contactList} />
    </main>;
}