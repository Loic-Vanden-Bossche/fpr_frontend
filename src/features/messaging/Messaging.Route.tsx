import type {Contact} from "../../types";
import {getDummyContacts} from "../../types";
import {MessagingContactList} from "./Messaging.ContactList.tsx";
import {messagingScreen} from "./Messaging.style.ts";
import {MessagingChatWindow} from "./Messaging.ChatWindow.tsx";
import {outPrimaryShadow} from "../../ui/shadows.ts";

export function MessagingRoute() {
    const classes = [messagingScreen, outPrimaryShadow]
    const contactList: Contact[] = [getDummyContacts(), getDummyContacts(), getDummyContacts()];
    return <main css={classes}>
        <MessagingContactList contacts={contactList} />
        <MessagingChatWindow contact={contactList[0]} />
    </main>;
}