/* eslint-disable no-console */
import { ReactElement } from "react";
import { Profile } from "../../types";
import { infoText, line, profilePicture, profilesList, profilesListCell } from "./Friends.style";
import { css } from "@emotion/react";
import { outWhiteShadow } from "../../ui";

interface Props{
  profiles: Profile[]
  rightPart: (profile: Profile) => ReactElement
}

export function FriendsProfilesList({ profiles, rightPart }: Props) {
  console.log(profiles);
  return <ul css={profilesList}>
    {profiles.map(profile =>
      <li key={profile.email} css={css(profilesListCell, outWhiteShadow)}>
        <div css={line("flex-start")}>
          <img
            src={profile.picture === "true" ?
              `https://medias.flash-player-revival.net/p/${profile.id}` :
              `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${profile.id}`}
            css={css(profilePicture, outWhiteShadow)}
          />
          <p css={infoText}>{profile.nickname}</p>
        </div>
        {rightPart(profile)}
      </li>
    )}
  </ul>;
}
