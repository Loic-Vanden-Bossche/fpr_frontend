import { css } from "@emotion/react";
import { colors } from "../../ui";

export const gameDisplay = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 32px - 40px - 32px);
  padding: 16px;
  border-radius: 32px;

  .screen {
    height: 100% !important;
    border-radius: 16px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: ${colors.white};
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
  }
  header {
    display: none;
  }
`;
