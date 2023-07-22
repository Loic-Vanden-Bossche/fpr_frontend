import { css } from "@emotion/react";
import { colors, inPrimaryShadowSmall, outWhiteShadow } from "..";

export const buttonStyle = css`
cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: hidden;
  background: ${colors.primary};
  color: ${colors.white};
  font-size: 1rem;
  font-weight: 600;

  ${outWhiteShadow}
  &:active{
    ${inPrimaryShadowSmall}
  }
`;
