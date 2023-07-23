import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { Profile } from "../../types";
import { useChangeProfilePictureMutation, useLazyGetProfileQuery } from "../../api";
import { profilePicture } from "./Account.style";
import { css } from "@emotion/react";
import { outWhiteShadow } from "../../ui";

interface Props{
  profile?: Profile
}

export function AccountProfilePicture({ profile }: Props) {
  const fileDialog = useRef<HTMLInputElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [uploadFile, { isSuccess: photoAsChanged }] = useChangeProfilePictureMutation();
  const [retrigger] = useLazyGetProfileQuery();

  const imageSrc = useMemo(() => profile?.picture ?
    `https://medias.flash-player-revival.net/p/${profile.id}` :
    `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${profile?.id}`, [profile]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const formData = new FormData();
      formData.append("file", file);
      uploadFile(formData);
    }
  };

  useEffect(() => {
    retrigger();
  }, [photoAsChanged, retrigger]);

  return <figure css={css(profilePicture, outWhiteShadow)} onClick={() => fileDialog.current?.click()}>
    <img src={imageSrc} ref={img}/>
    <input
      type="file"
      ref={fileDialog}
      accept="image/png,image/gif,image/jpeg"
      onChange={handleFileUpload}
    />
    <p>change profile picture</p>
  </figure>;
}
