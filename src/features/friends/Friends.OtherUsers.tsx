/* eslint-disable no-console */
import { useAddFriendMutation, useSearchUsersQuery } from "../../api";
import { Icon, icons } from "../../lib";
import { Button, colors } from "../../ui";
import { FriendsDetails } from "./Friends.Details";
import { FriendsProfilesList } from "./Friends.ProfilesList";
import { infoText } from "./Friends.style";

interface Props{
  search: string
}

export function FriendsOtherUsers({ search }: Props) {
  const { data } = useSearchUsersQuery(search);
  const [sendInvite] = useAddFriendMutation();

  if(!search) { return null; }

  return <FriendsDetails title="Other users" numberOfElements={data?.length} >
    {data ? data.length ?
      <FriendsProfilesList
        profiles={data}
        rightPart={profile => <Button onClick={() => sendInvite(profile.id)}>
          <Icon icon={icons.addFriend} color={colors.white}/>
          add to friends
        </Button>}
      /> :
      <p css={infoText}>No users were find with this username or email</p>:
      <p css={infoText}>We are searching for users please wait...</p>
    }
  </FriendsDetails>;
}
