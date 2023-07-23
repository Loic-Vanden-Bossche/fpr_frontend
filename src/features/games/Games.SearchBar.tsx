import { css } from "@emotion/react";
import { searchBar } from "../friends/Friends.style.ts";
import { inWhiteShadow } from "../../ui";
import { ChangeEvent } from "react";

interface Props{
  value: string;
  onChange: (value: string) => void
}

export function GamesSearchBar({ value, onChange }: Props){

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.currentTarget.value);

  return <input
    css={css(searchBar, inWhiteShadow)}
    placeholder="Start typing to search games"
    value={value}
    onChange={handleFormChange}
  />;
}
