/* eslint-disable no-console */
import { useAddFriendMutation } from "../../api";
import { Icon, icons } from "../../lib";
import { Profile } from "../../types";
import { Button, colors } from "../../ui";
import { FriendsProfilesList } from "./Friends.ProfilesList";
import { infoText } from "./Friends.style";

interface Props{
  profiles?: Profile[]
}

export function FriendsOtherUsersList({ profiles }: Props) {
  const [sendInvite] = useAddFriendMutation();

  if (!profiles) { return <p css={infoText}>We are searching for users please wait...</p>; }
  if (!profiles.length) { return <p css={infoText}>No users were find with this username or email</p>; }
  return <FriendsProfilesList
    profiles={profiles}
    rightPart={profile =>
      <Button onClick={() => sendInvite(profile.id)}>
        <Icon icon={icons.addFriend} color={colors.white}/>
            add to friends
      </Button>
    }
  />;
}
