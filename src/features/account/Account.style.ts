import { css } from "@emotion/react";
import { borderRadius, colors } from "../../ui";

export const page = css`
  height: calc(100% - 32px - 40px);
  width: 100%;
  background: ${colors.white};
  border-radius: ${borderRadius};
  display: flex;
  flex-direction: row;
`;
