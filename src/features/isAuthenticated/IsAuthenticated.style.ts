import { css } from "@emotion/react";

export const page = css`
  display: flex;
  flex-direction: column;
  padding: 32px;
  height: calc(100% - 32px - 32px);
  gap: 32px;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
`;

export const actions = css`
  display: flex;
  align-items: center;
  gap: 32px;
`;
