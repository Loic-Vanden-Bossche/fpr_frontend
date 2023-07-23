import { Group } from "../../types";
import { chatHeader } from "./Messaging.style.ts";
import { MessagingContactPicture } from "./Messaging.ContactPicture.tsx";
import { outWhiteFilter } from "../../ui/shadows.ts";
import { GamesToogleButton } from "../games/Games.ToogleButton.tsx";

interface Props {
  contact: Group;
  showGames: boolean;
  handleOnShowGamesClick: () => void;
}

export function MessagingChatHeader({ contact, showGames, handleOnShowGamesClick }: Props) {
  return <header css={chatHeader}>
    <MessagingContactPicture group={contact} shadow={outWhiteFilter}/>
    <h1>{contact.name}</h1>
    <GamesToogleButton isActive={showGames} onClick={handleOnShowGamesClick}/>
  </header>;
}
