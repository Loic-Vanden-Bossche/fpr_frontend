import { Group } from "../../types";
import { chatHeader } from "./Messaging.style.ts";
import { MessagingContactPicture } from "./Messaging.ContactPicture.tsx";
import { outWhiteFilter } from "../../ui/shadows.ts";
import { GamesToogleButton } from "../games/Games.ToogleButton.tsx";
import { useGetProfileQuery } from "../../api/auth.ts";
import { useMemo } from "react";

interface Props {
  contact: Group;
  showGames: boolean;
  handleOnShowGamesClick: () => void;
}

export function MessagingChatHeader({ contact, showGames, handleOnShowGamesClick }: Props) {
  const { data: self } = useGetProfileQuery();

  const members = useMemo(() => contact.members.filter(({ user }) => user.id !== self?.id), [contact, self]);

  return <header css={chatHeader}>
    <MessagingContactPicture members={members} shadow={outWhiteFilter}/>
    <h1>{contact.name}</h1>
    <GamesToogleButton isActive={showGames} onClick={handleOnShowGamesClick}/>
  </header>;
}
