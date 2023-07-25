import { SerializedStyles, css } from "@emotion/react";
import { GroupMember } from "../../types";
import { MessagingContactPictureImage } from "./Messaging.ContactPicture.Image";
import { groupPicture } from "./Messaging.style";

interface Props{
  members?: GroupMember[];
  shadow: SerializedStyles;
}

export function MessagingContactPicture({ members, shadow }: Props) {
  if (!members?.length) { return null; }

  else if (members?.length === 1) {
    return <div css={shadow}>
      <MessagingContactPictureImage user={members[0].user}/></div>;
  }

  return <figure css={css([groupPicture(Math.ceil(Math.sqrt(members.length ?? 4))), shadow])}>
    {members.map(({ user }) => <MessagingContactPictureImage key={user.email} user={user}/>)}
  </figure>;
}
