import { useRemoveFriendMutation } from "../../api";
import { Icon, icons } from "../../lib";
import { Profile } from "../../types";
import { Button, colors } from "../../ui";
import { FriendsIdentitiesList } from "./Friends.IdentitiesList";
import { infoText } from "./Friends.style";

interface Props{
  profiles?: Profile[]
}

export function FriendsCurrentFriendsList({ profiles }: Props) {
  const [removeFriend] = useRemoveFriendMutation();
  if (!profiles) { return <p css={infoText}>Friends list is loading...</p>; }
  if (!profiles.length) { return <p css={infoText}>No friends has been found</p>; }
  return <FriendsIdentitiesList
    profiles={profiles}
    rightPart={({ id }) => <Button onClick={() => removeFriend(id)} background="#bb0f26">
      <Icon icon={icons.refuse} color={colors.white}/>
      delete
    </Button>}
  />;
}
