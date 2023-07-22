import { css } from "@emotion/react";
import { modal, visible } from "./Friends.style";

interface Props{
  show: boolean;
}

export function FriendsModal({ show }: Props) {
  return <section css={css(modal, show&& visible)}>
    to do: ajouter la liste des amis
  </section>;
}
