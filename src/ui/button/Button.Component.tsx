import { ReactNode } from "react";
import { buttonStyle } from "./Button.style";

interface Props{
  onClick: () => void;
  children: ReactNode
}

export function Button({ onClick, children }: Props) {
  return <button
    onClick={onClick}
    css={buttonStyle}
  >
    {children}
  </button>;
}
