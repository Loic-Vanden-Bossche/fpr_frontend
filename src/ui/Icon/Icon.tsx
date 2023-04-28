import {ReactElement} from "react";
import {iconStyle} from "./Icon.style.ts";

interface Props {
  icon: ReactElement<SVGElement>;
  color: string;
  size: string;
}

export function Icon({icon, color, size}: Props) {
  return <div css={iconStyle(color, size)}>{icon}</div>;
}