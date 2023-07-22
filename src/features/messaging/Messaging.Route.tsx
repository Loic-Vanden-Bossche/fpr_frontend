/* eslint-disable no-console */
import { MessagingContactList } from "./Messaging.ContactList.tsx";
import { messagingScreen } from "./Messaging.style.ts";
import { MessagingChatWindow } from "./Messaging.ChatWindow.tsx";
import { outPrimaryShadow } from "../../ui";
import { useContext, useEffect, useState } from "react";
import { useGetGroupsQuery } from "../../api";
import { stompSocket } from "../../ws/messaging.ts";
import { useGetProfileQuery } from "../../api";

export function MessagingRoute() {
  const { data } = useGetGroupsQuery();
  const { data: self } = useGetProfileQuery();
  const ws = useContext(stompSocket);
  const classes = [messagingScreen, outPrimaryShadow];
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    if(data){
      const subs = data
        .filter((_, i) => i !== selectedIndex)
        .map((group) => ws.subscribe("/groups/" + group.id + "/messages", message => {
          const data = JSON.parse(message.body);
          if(data.type === "NEW"){
            console.log("NOTIFICATION", data, group);
          }
        }));
      return () => {
        subs.forEach(s => s.unsubscribe);
      };
    }
  }, [data, ws, selectedIndex]);

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
