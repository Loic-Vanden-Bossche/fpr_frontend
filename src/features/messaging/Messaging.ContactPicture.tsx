import { Interpolation, Theme, css } from "@emotion/react";
import { Group } from "../../types";
import { MessagingContactPictureImage } from "./Messaging.ContactPicture.Image";
import { groupPicture } from "./Messaging.style";

interface Props{
  group: Group;
  shadow: Interpolation<Theme>;
}

export function MessagingContactPicture({ group, shadow }: Props) {
  return <figure css={css(groupPicture(Math.ceil(Math.sqrt(group.members.length))), shadow)}>
    {group.members.map(({ user }) => <MessagingContactPictureImage key={user.email} user={user}/>)}
  </figure>;
}
