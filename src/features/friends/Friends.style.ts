import { css } from "@emotion/react";
import { colors } from "../../ui";

export const button = css`
  background: ${colors.primary};
  display: flex;
  gap: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  border: hidden;
  color: ${colors.white};
  font-size: 1rem;
  font-weight: 600;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
`;

export const toggled = css`
  background: ${colors.white};
  color: ${colors.primary};
`;
