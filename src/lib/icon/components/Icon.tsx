import {ReactElement} from "react";
import {iconStyle} from "./Icon.style";
import {css as emotionCss} from "@emotion/react";
import type {StyleProps} from "../..";

interface Props extends StyleProps {
  icon: ReactElement<SVGElement>;
  color?: string;
  size?: string;
  title?: string;
  onClick?: () => void;
}

export function Icon({
  icon, color, size, style, className, title, onClick
}: Props) {
  const css = emotionCss(iconStyle(color ?? "black", size ?? "24px"), style);
  return <div css={css} className={className} title={title} onClick={onClick}>{icon}</div>;
}
