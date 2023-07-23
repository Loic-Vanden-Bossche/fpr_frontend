import { css } from "@emotion/react";
import { colors } from "./values.ts";

export const gamesStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  gap: 16px;
`;

export const gamesCard = css`
  background: ${colors.primary};
  border-radius: 16px;
  width: 164px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  cursor: pointer;
`;
