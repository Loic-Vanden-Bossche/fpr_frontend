import { css } from "@emotion/react";
import { button, toggled } from "./Friends.style";
import { colors, outPrimaryShadow } from "../../ui";
import { Icon, icons } from "../../lib";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export function FriendsToggleButton({ isActive, onClick }: Props) {

  return <button css={css(button, isActive && toggled, outPrimaryShadow)} onClick={onClick}>
    <Icon icon={icons.friends} color={isActive ? colors.primary : colors.white}/>
    friends
  </button>;
}
