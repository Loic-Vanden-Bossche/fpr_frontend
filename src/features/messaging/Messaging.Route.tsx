import type {Contact} from "../../types";
import {getDummyContacts} from "../../types";
import {MessagingContactList} from "./Messaging.ContactList.tsx";
import {messagingScreen} from "./Messaging.style.ts";
import {MessagingChatWindow} from "./Messaging.ChatWindow.tsx";
import {outPrimaryShadow} from "../../ui";
import {useState} from "react";

export function MessagingRoute() {
    const classes = [messagingScreen, outPrimaryShadow]
    const contactList: Contact[] = [getDummyContacts(), {id: "oui", name: "Enzo", profilePic: "https://api.dicebear.com/6.x/notionists-neutral/svg?seed=John" }, {id: "oui", name: "Benoit", profilePic: "https://api.dicebear.com/6.x/notionists-neutral/svg?seed=Didier" }, {id: "oui", name: "Francois", profilePic: "https://api.dicebear.com/6.x/notionists-neutral/svg?seed=Ahmid" }, {id: "oui", name: "Jean", profilePic: "https://api.dicebear.com/6.x/notionists-neutral/svg?seed=Jon" }];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleContactClick = (index: number) => setSelectedIndex(index);

    return <main css={classes}>
        <MessagingContactList selectedContactIndex={selectedIndex} contacts={contactList} onContactClick={handleContactClick}/>
        <MessagingChatWindow contact={contactList[selectedIndex]} />
    </main>;
}