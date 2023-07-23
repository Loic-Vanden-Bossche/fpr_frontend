import { ReactNode } from "react";
import { buttonStyle } from "./Button.style";
import { colors, outWhiteShadow } from "..";
import { SerializedStyles, css } from "@emotion/react";

interface Props{
  onClick: () => void;
  children: ReactNode;
  background?: string;
  color?: string;
  shadow?: SerializedStyles
}

export function Button({
  onClick,
  children,
  background = colors.primary,
  color = colors.white,
  shadow = outWhiteShadow
}: Props) {
  return <button
    onClick={onClick}
    css={css(buttonStyle(background, color), shadow)}
  >
    {children}
  </button>;
}
