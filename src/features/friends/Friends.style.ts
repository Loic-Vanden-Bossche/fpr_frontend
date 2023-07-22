import { css } from "@emotion/react";
import { borderRadius, colors } from "../../ui";

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
  min-height: min(600px, calc(100vh - 32px - 40px - 32px - 32px));
  max-height: min(600px, calc(100vh - 32px - 40px - 32px - 32px));
  width: min(600px, calc(100vw - 32px - 32px - 32px));
  background: ${colors.white};
  transition: 0.3s;
  border-radius: ${borderRadius} 0 ${borderRadius} ${borderRadius};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  overflow-y: auto;
  overflow-x: hidden;

  transform-origin: top right;
  scale: 0;
`;

export const visible = css`
  scale: 1;
  opacity: 1;
`;

export const searchBar = css`
  padding: 16px;
  border-radius: 27.5px;
  font-size: 1rem;
  width: calc(100% - 16px - 16px);
  border: hidden;
  background: ${colors.white};
`;

export const infoText = css`
  margin: 0;
`;

export const detailsTitle = css`
  font-size: 1rem;
  font-weight: 800;
  
  details[open] > & {
    margin-bottom: 16px;
  }
`;

export const profilesList = css`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const profilesListCell = css`
  background: ${colors.white};
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: calc(${borderRadius} / 2);
`;
