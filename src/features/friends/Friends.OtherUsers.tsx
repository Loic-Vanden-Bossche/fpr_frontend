import { useMemo } from "react";
import { useSearchUsersQuery } from "../../api";
import { FriendsDetails } from "./Friends.Details";
import { FriendsOtherUsersList } from "./Friends.OtherUsers.List";

interface Props{
  search: string
}

export function FriendsOtherUsers({ search }: Props) {
  const { data } = useSearchUsersQuery(search);
  const filteredSearch = useMemo(() => data?.filter(({ status }) => !status), [data]);

  if(!search) { return null; }

  return <FriendsDetails title="Other users" numberOfElements={filteredSearch?.length} >
    <FriendsOtherUsersList profiles={filteredSearch} />
  </FriendsDetails>;
}
