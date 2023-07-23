import { ChangeEvent, useMemo, useRef } from "react";
import { Games } from "../../types";
import { gamePicture } from "./Account.style";
import { useUploadGameThumbnailMutation } from "../../api/games";

interface Props{
  game: Games
}

export function AccountGamePicture({ game }:Props) {
  const fileDialog = useRef<HTMLInputElement>(null);
  const src = useMemo(() => game.picture ?
    `https://medias.flash-player-revival.net/g/${game.id}` :
    `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${game.id}`, [game]);
  const [uploadThumbnail] = useUploadGameThumbnailMutation();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const formData = new FormData();
      formData.append("file", file);
      uploadThumbnail({ id: game.id, formData });
    }
  };

  return <figure css={gamePicture} onClick={() => fileDialog.current?.click()}>
    <img src={src}/>
    <input
      type="file"
      ref={fileDialog}
      accept="image/png,image/gif,image/jpeg"
      onChange={handleFileUpload}
    />
    <p>Change</p>
  </figure>;
}
