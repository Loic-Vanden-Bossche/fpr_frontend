import { button, toggled } from "./Games.style";
import { css } from "@emotion/react";
import { colors, outWhiteShadow } from "../../ui";
import { Icon, icons } from "../../lib";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export function GamesToogleButton({ isActive, onClick }: Props) {
  return <button css={css(button, isActive && toggled, outWhiteShadow)} onClick={onClick}>
    <Icon icon={icons.games} color={isActive ? colors.primary : colors.white}/>
    Games
  </button>;
}
