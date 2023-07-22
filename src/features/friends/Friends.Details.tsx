import { ReactElement } from "react";
import { detailsTitle } from "./Friends.style";

interface Props{
  title: string;
  numberOfElements?: number;
  children: ReactElement<HTMLUListElement>
}

export function FriendsDetails({ title, numberOfElements = 0, children }: Props) {
  return <details>
    <summary css={detailsTitle}>{title} ({numberOfElements})</summary>
    {children}
  </details>;
}
