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
  width: calc(24px + 64px + 24px);
  min-width: calc(24px + 64px + 24px);
  resize: horizontal;
  z-index: 10;
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
  margin-inline: -24px;
  margin-block: 0;
  padding-inline: 24px;
  padding-block: 0;
  padding-bottom: 16px;
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
  height: 64px;
  width: 64px;
  aspect-ratio: 1 / 1;
  align-self: center;
  border-radius: 50%;

  figure > & {
    height: auto;
    width: 100%;  
    rotate: ${rotation}deg;
    translate: ${x}% ${y}%;
    scale: calc(1 * ${scale});
  }
`;

export const groupModale = css`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  
  > div {
    border-radius: 32px;
    background: #EEEEEE;
    box-shadow: -5px -5px 16px #fa3d5c, 5px 5px 16px #A5031C;
    padding: 24px;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    > div {
      display: flex;
      gap: 8px;
      
      > input {
        flex-grow: 1;
      }
    }
    
    > label {
      display: flex;
      align-items: center;
      border-radius: 12px;
      padding: 8px;
      color: #D0253C;
      font-family: Roboto Flex, sans-serif;
      font-weight: 600;
      font-size: 1.5rem;
      gap: 32px;
      
      :has(input:checked){
        background: #D0253C;
        color: white;
      }
      
      input {
        display: none;
      }
    }
  }
`;

export const addButton = css`
  height: 100px;
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-family: Roboto Flex, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  
  :hover {
    background: #A5031C;
  }
`;

export const createButton = css`
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
