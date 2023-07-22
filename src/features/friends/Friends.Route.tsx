import { useState } from "react";
import { Icon, icons } from "../../lib";
import { colors, outPrimaryShadow } from "../../ui";
import { button, toggled } from "./Friends.style";
import { css } from "@emotion/react";

export function FriendsRoute() {
  const [showFriends, setShowFriend] = useState(false);
  const handleButtonClick = () => setShowFriend(!showFriends);

  return <button css={css(button, showFriends && toggled, outPrimaryShadow)} onClick={handleButtonClick}>
    <Icon icon={icons.friends} color={showFriends ? colors.primary : colors.white}/>
    friends
  </button>;
}
