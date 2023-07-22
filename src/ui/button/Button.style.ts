import { css } from "@emotion/react";
import { inPrimaryShadowSmall, outWhiteShadow } from "..";

export const buttonStyle = (background: string, color: string) => css`
cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: hidden;
  background: ${background};
  color: ${color};
  font-size: 1rem;
  font-weight: 600;

  ${outWhiteShadow}
  &:active{
    ${inPrimaryShadowSmall}
  }
`;
