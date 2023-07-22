import { useMemo } from "react";
import { useGetPendingInvitesQuery } from "../../api";
import { FriendsDetails } from "./Friends.Details";
import { FriendsPendingInvitesList } from "./Friends.PendingInvites.List";

interface Props{
  search: string
}

export function FriendsPendingInvites({ search }: Props) {
  const { data } = useGetPendingInvitesQuery();
  const filteredInvites = useMemo(() => data?.filter(({ nickname, email }) => {
    const searchRegex = new RegExp(search);
    return searchRegex.test(nickname) || searchRegex.test(email);
  }), [data, search]);

  return <FriendsDetails title="Pending invites" numberOfElements={filteredInvites?.length}>
    <FriendsPendingInvitesList profiles={filteredInvites}/>
  </FriendsDetails>;
}
