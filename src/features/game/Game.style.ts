import { css } from "@emotion/react";
import { colors, inPrimaryShadowSmall, inWhiteShadow, outPrimaryShadowSmall } from "../../ui";

export const gameDisplay = (hasInput: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 32px - 40px - 32px);
  padding: 16px;
  border-radius: 32px;

  .screen {
    height: calc(100% ${hasInput ? "- 22px - 16px": ""}) !important;
    border-radius: 16px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: ${colors.white};
    ${inWhiteShadow}
  }
  svg {
    width: 100%;
    max-width: fit-content;
    height: fit-content;
    max-height: 100%;
  }
`;

export const form = css`
  flex-direction: row;
  main {
    width: 100%;
    header {
      display: none;
    }
    
    input {
      width: calc(100% - 16px);
      background: ${colors.white};
      border-radius: 17px;
      border: hidden;
      font-size: 1rem;
      padding: 8px;
      ${inWhiteShadow}
    }
  }
  input[type=submit] {
    background: ${colors.primary};
    border-radius: 17px;
    border: hidden;
    font-size: 1rem;
    color: ${colors.white};
    ${outPrimaryShadowSmall}
    padding: 8px;
    transition: 0.3s;

    &:active{
      ${inPrimaryShadowSmall}
    }
    
    &:disabled{
      box-shadow: none;
      cursor: not-allowed;
    }
  }
`;
