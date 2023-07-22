import { ReactElement } from "react";
import { clickableIcon, iconStyle } from "./Icon.style";
import { css as emotionCss } from "@emotion/react";
import type { StyleProps } from "../..";

interface Props extends StyleProps {
  icon: ReactElement<SVGElement>;
  color?: string;
  size?: string;
  title?: string;
  onClick?: () => void;
}

export function Icon({
  icon,
  color = "black",
  size = "24px",
  style,
  className,
  title,
  onClick
}: Props) {
  const css = emotionCss(iconStyle(color, size), onClick && clickableIcon, style);
  return <div css={css} className={className} title={title} onClick={onClick}>{icon}</div>;
}
