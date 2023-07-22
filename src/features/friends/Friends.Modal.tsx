import { css } from "@emotion/react";
import { modal, visible } from "./Friends.style";
import { useGetFriendsQuery } from "../../api";
import { FriendsList } from "./Friends.List";
import { FriendsDetails } from "./Friends.Details";
import { FriendsSearchBar } from "./Friends.SearchBar";
import { useState } from "react";
import { FriendsOtherUsers } from "./Friends.OtherUsers";

interface Props{
  show: boolean;
}

export function FriendsModal({ show }: Props) {
  const [search, setSearch] = useState("");
  const { data: friends } = useGetFriendsQuery();

  const handleSearchBarChange = (value: string) => setSearch(value);

  return <section css={css(modal, show&& visible)}>
    <FriendsSearchBar value={search} onChange={handleSearchBarChange}/>
    <FriendsDetails title="Friends list" numberOfElements={friends?.length}>
      <FriendsList friends={friends}/>
    </FriendsDetails>
    <FriendsOtherUsers search={search}/>
  </section>;
}
