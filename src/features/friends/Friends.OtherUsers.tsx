/* eslint-disable no-console */
import { useSearchUsersQuery } from "../../api";
import { FriendsDetails } from "./Friends.Details";
import { FriendsOtherUsersList } from "./Friends.OtherUsers.List";

interface Props{
  search: string
}

export function FriendsOtherUsers({ search }: Props) {
  const { data } = useSearchUsersQuery(search);

  if(!search) { return null; }

  return <FriendsDetails title="Other users" numberOfElements={data?.length} >
    <FriendsOtherUsersList profiles={data} />
  </FriendsDetails>;
}
