/* eslint-disable no-console */
import { ChangeEvent, useMemo, useRef } from "react";
import { useChangeProfilePictureMutation, useGetProfileQuery } from "../../api";
import { page } from "./Account.style";

export function AccountRoute() {
  const { data } = useGetProfileQuery();
  const imageSrc = useMemo(() => data?.picture?
    `https://medias.flash-player-revival.net/p/${data.id}` :
    `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${data?.id}`, [data]);
  const fileDialog = useRef<HTMLInputElement>(null);
  const [uploadFile] = useChangeProfilePictureMutation();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const formData = new FormData();
      formData.append("file", file);
      uploadFile(formData);
    }
  };

  return <section css={page}>
    <img src={imageSrc} onClick={() => fileDialog.current?.click()}/>
    <input
      type="file"
      ref={fileDialog}
      accept="image/png,image/gif,image/jpeg"
      onChange={handleFileUpload}
    />
  </section>;
}
