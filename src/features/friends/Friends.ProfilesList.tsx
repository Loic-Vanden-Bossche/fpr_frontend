import { ReactElement } from "react";
import { Profile } from "../../types";
import { infoText, profilesList, profilesListCell } from "./Friends.style";
import { css } from "@emotion/react";
import { outWhiteShadow } from "../../ui";

interface Props{
  profiles: Profile[]
  rightPart: (profile: Profile) => ReactElement
}

export function FriendsProfilesList({ profiles, rightPart }: Props) {
  return <ul css={profilesList}>
    {profiles.map(profile =>
      <li key={profile.email} css={css(profilesListCell, outWhiteShadow)}>
        <p css={infoText}>{profile.nickname}</p>
        {rightPart(profile)}
      </li>
    )}
  </ul>;
}
