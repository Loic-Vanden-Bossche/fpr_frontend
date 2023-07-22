import { css } from "@emotion/react";
import { colors } from "../../ui";

export const section = (isActive: boolean) => css`
  height: 40px;
  width: 123px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: 0.3s;
  ${isActive ? `filter: drop-shadow(0 5px 16px ${colors.dark_primary}55); z-index: 1;` : ''}
`;

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
  border-radius: 8px 8px 0 0;
  box-shadow: none;
`;

export const modal = css`
  max-height: min(600px, calc(100vh - 32px - 40px - 32px - 32px));
  width: min(600px, calc(100vw - 32px - 32px - 32px));
  background: ${colors.white};
  transition: 0.3s;
  border-radius: 50%;
  padding: 16px;

  transform-origin: calc(100% - 60px) calc(0% - 10px);
  scale: 0;
`;

export const visible = css`
  border-radius: 8px 0 8px 8px;
  scale: 1;
`;
