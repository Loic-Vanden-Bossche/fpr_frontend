import { useState } from "react";
import { FriendsToggleButton } from "./Friends.ToggleButton";
import { section } from "./Friends.style";
import { FriendsModal } from "./Friends.Modal";

export function FriendsRoute() {
  const [showFriends, setShowFriend] = useState(false);
  const handleButtonClick = () => setShowFriend(!showFriends);

  return <section css={section(showFriends)}>
    <FriendsToggleButton isActive={showFriends} onClick={handleButtonClick}/>
    <FriendsModal show={showFriends}/>
  </section>;
}
