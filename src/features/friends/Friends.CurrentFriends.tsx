import { useMemo } from "react";
import { useGetFriendsQuery } from "../../api";
import { FriendsCurrentFriendsList } from "./Friends.CurrentFriends.List";
import { FriendsDetails } from "./Friends.Details";

interface Props{
  search: string
}

export function FriendsCurrentFriends({ search }: Props) {
  const { data } = useGetFriendsQuery();
  const filteredFriends = useMemo(() => data?.filter(({ nickname, email }) => {
    const searchRegex = new RegExp(search);
    return searchRegex.test(nickname) || searchRegex.test(email);
  }), [data, search]);

  return <FriendsDetails title="Friends list" numberOfElements={filteredFriends?.length}>
    <FriendsCurrentFriendsList profiles={filteredFriends}/>
  </FriendsDetails>;
}
