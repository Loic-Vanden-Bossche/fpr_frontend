import { css } from "@emotion/react";
import { borderRadius, colors } from "../../ui";

export const profilePic = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const linearCell = css`
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  padding: 24px;
  height: calc(100px - 48px);
  cursor: pointer;
  transition: background 0.2s, left 0.2s, top 0.2s;
  
  p {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: ${colors.dark_primary};
  }
  
  &.selected {
    left: 100%;
  }
  
  &.selected ~ & {
    top: -100px;
  }
`;

export const contactList = css`
  margin: 0;
  padding: 0;
  border-radius: ${borderRadius} 0 0 ${borderRadius};
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  flex-shrink: 0;
  max-width: 75%;
  min-width: calc(24px + 64px + 24px);
  resize: horizontal;
`;

export const messagingScreen = css`
  height: calc(100% - 32px - 40px);
  width: 100%;
  background: ${colors.primary};
  border-radius: ${borderRadius};
  display: flex;
  flex-direction: row;
`;

export const messagingChat = css`
  width: calc(100% - 24px - 24px);
  height: calc(100% - 24px - 24px);
  overflow: hidden;
  background: ${colors.white};
  border-radius: 0 ${borderRadius} ${borderRadius} 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 24px;
`;

export const chatHeader = css`
  display: flex;
  align-items: center;
  gap: 16px;
  
  h1 {
    margin: 0;
    font-size: 2rem;
    letter-spacing: 0.1rem;
    font-weight: 800;
    color: ${colors.light_primary};
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const chatProfilePic = css`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

export const chatMessage = css`
  padding: 16px;
  background: ${colors.white};
  border-radius: ${borderRadius};
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.black};
  width: fit-content;
  max-width: 75%;
  white-space: pre-wrap;
  position: relative;
  span {
    font-weight: 900;
  }
`;

export const chatMessageContainer = css`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 16px;
  list-style: none;
  height: 92%;
  margin: -24px;
  padding: 24px;
`;

export const receivedMessage = css`
  background: ${colors.primary};
  color: ${colors.white};
  align-self: flex-end;
`;

export const chatInput = css`
  border: hidden;
  background: ${colors.white};
  border-radius: ${borderRadius};
  padding: 16px;
  resize: vertical;
  max-height: 50%;
  height: 1.4rem;
  min-height: calc(1rem + 3px);
  font-size: 1rem;
  overflow-x: hidden;
  overflow-y: auto;

  &::placeholder {
    white-space: nowrap;
  }
`;

export const groupPicture = (columnNumber: number) => css`
  height: 64px;
  width: 64px;
  display: grid;
  grid-template-columns: repeat(${columnNumber}, 1fr);
  margin: 0;
  flex-shrink: 0;
  gap: 8px;
`;

export const groupPictureImage = (rotation:number, x:number, y:number, scale: number) => css`
  width: 100%;
  aspect-ratio: 1 / 1;
  align-self: center;
  rotate: ${rotation}deg;
  translate: ${x}% ${y}%;
  scale: calc(1 * ${scale});
  border-radius: 50%;
`;
