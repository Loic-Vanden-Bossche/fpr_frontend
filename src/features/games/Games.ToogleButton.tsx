import { button, toggled } from "../friends/Friends.style.ts";
import { css } from "@emotion/react";
import { colors, outPrimaryShadow } from "../../ui";
import { Icon, icons } from "../../lib";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export function GamesToogleButton({ isActive, onClick }: Props) {
  return <button css={css(button, isActive && toggled, outPrimaryShadow)} onClick={onClick}>
    <Icon icon={icons.games} color={isActive ? colors.primary : colors.white}/>
    Games
  </button>;
}
