import { css } from "@emotion/react";
import { modal, visible } from "./Friends.style";
import { FriendsSearchBar } from "./Friends.SearchBar";
import { useState } from "react";
import { FriendsOtherUsers } from "./Friends.OtherUsers";
import { FriendsCurrentFriends } from "./Friends.CurrentFriends";
import { FriendsPendingInvites } from "./Friends.PendingInvites";

interface Props{
  show: boolean;
}

export function FriendsModal({ show }: Props) {
  const [search, setSearch] = useState("");

  const handleSearchBarChange = (value: string) => setSearch(value);

  return <section css={css(modal, show&& visible)}>
    <FriendsSearchBar value={search} onChange={handleSearchBarChange}/>
    <FriendsCurrentFriends search={search}/>
    <FriendsPendingInvites search={search}/>
    <FriendsOtherUsers search={search}/>
  </section>;
}
