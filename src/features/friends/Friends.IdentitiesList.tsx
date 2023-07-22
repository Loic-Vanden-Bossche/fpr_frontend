/* eslint-disable no-console */
import { ReactElement } from "react";
import { Identity } from "../../types";
import { infoText, line, profilePicture, profilesList, profilesListCell } from "./Friends.style";
import { css } from "@emotion/react";
import { outWhiteShadow } from "../../ui";

interface Props{
  profiles: Identity[]
  rightPart: (identity: Identity) => ReactElement
}

export function FriendsIdentitiesList({ profiles, rightPart }: Props) {
  console.log(profiles);
  return <ul css={profilesList}>
    {profiles.map(profile =>
      <li key={profile.email} css={css(profilesListCell, outWhiteShadow)}>
        <div css={line("flex-start")}>
          <img
            src={profile.picture?
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
