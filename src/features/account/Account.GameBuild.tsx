import { ChangeEvent, useRef, useState } from "react";
import { Games } from "../../types";
import { Button } from "../../ui";
import { css } from "@emotion/react";
import { useBuildGameMutation } from "../../api/games";

interface Props{
  game: Games
}

export function AccountGameBuild({ game }: Props) {
  const [language, setLanguage] = useState("python");
  const fileDialog = useRef<HTMLInputElement>(null);
  const [buildGame] = useBuildGameMutation();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);
      buildGame({ id: game.id, file:formData });
    }
  };

  return <>
    <select value={language} onChange={e => setLanguage(e.currentTarget.value)}>
      <option value={"python"}>python</option>
      <option value={"node"}>node</option>
    </select>
    <input
      css={css("display: none")}
      type="file"
      accept=".zip"
      ref={fileDialog}
      onChange={handleFileUpload}
    />
    <Button onClick={() => fileDialog.current?.click()}>Build game</Button>
  </>;
}
