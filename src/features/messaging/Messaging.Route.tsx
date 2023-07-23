import { MessagingContactList } from "./Messaging.ContactList.tsx";
import { messagingScreen } from "./Messaging.style.ts";
import { MessagingChatWindow } from "./Messaging.ChatWindow.tsx";
import { outPrimaryShadow } from "../../ui";
import { useState } from "react";
import { useGetGroupsQuery } from "../../api";
import { useGetProfileQuery } from "../../api";

export function MessagingRoute() {
  const { data } = useGetGroupsQuery();
  const { data: self } = useGetProfileQuery();
  const classes = [messagingScreen, outPrimaryShadow];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleContactClick = (index: number) => setSelectedIndex(index);

  return <main css={classes}>
    <MessagingContactList
      selectedContactIndex={selectedIndex}
      contacts={data ?? []}
      onContactClick={handleContactClick}
    />
    {data !== undefined && self !== undefined && <MessagingChatWindow group={data[selectedIndex]} self={self}/>}
  </main>;
}
