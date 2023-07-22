import { ReactNode } from "react";
import { buttonStyle } from "./Button.style";
import { colors } from "..";

interface Props{
  onClick: () => void;
  children: ReactNode;
  background?: string;
  color?: string
}

export function Button({ onClick, children, background = colors.primary, color = colors.white }: Props) {
  return <button
    onClick={onClick}
    css={buttonStyle(background, color)}
  >
    {children}
  </button>;
}
