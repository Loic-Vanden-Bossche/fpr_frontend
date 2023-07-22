import { ChangeEvent } from "react";
import { searchBar } from "./Friends.style";
import { css } from "@emotion/react";
import { inWhiteShadow } from "../../ui";

interface Props{
  value: string;
  onChange: (value: string) => void
}

export function FriendsSearchBar({ value, onChange }: Props) {
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.currentTarget.value);

  return <input
    css={css(searchBar, inWhiteShadow)}
    placeholder="Start typing to search friends by username or email"
    value={value}
    onChange={handleFormChange}
  />;
}
