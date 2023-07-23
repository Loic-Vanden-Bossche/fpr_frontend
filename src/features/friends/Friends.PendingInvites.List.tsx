import { useAcceptInviteMutation, useRefuseInviteMutation } from "../../api";
import { Icon, icons } from "../../lib";
import { Profile } from "../../types";
import { Button, colors } from "../../ui";
import { FriendsIdentitiesList } from "./Friends.IdentitiesList";
import { infoText, line } from "./Friends.style";

interface Props{
  profiles?: Profile[]
}

export function FriendsPendingInvitesList({ profiles }: Props) {
  const [acceptInvitation] = useAcceptInviteMutation();
  const [refuseInvitation] = useRefuseInviteMutation();

  if(!profiles){ return <p css={infoText}>We are searching for pending invites please wait...</p>; }
  if (!profiles.length){ return <p css={infoText}>You don't have any pending invites</p>; }
  return <FriendsIdentitiesList
    profiles={profiles}
    rightPart={({ id }) => <div css={line("flex-end")}>
      <Button onClick={() => acceptInvitation(id)} background="#bb0f26">
        <Icon icon={icons.accept} color={colors.white}/>
        accept
      </Button>
      <Button onClick={() => refuseInvitation(id)} background="#0c8033">
        <Icon icon={icons.refuse} color={colors.white}/>
        refuse
      </Button>
    </div>}
  />;
}
