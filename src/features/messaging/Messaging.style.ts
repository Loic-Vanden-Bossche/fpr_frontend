import {css} from "@emotion/react";

export const profilePic = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const linearCell = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  padding: 24px;
  height: calc(100px - 48px);
  cursor: pointer;
  transition: background 0.2s;
  
  p {
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }
  
  &:hover {
    background: #9E001944;
  }
`;

export const contactList = css`
  margin: 0;
  padding: 0;
  border-radius: 32px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

export const messagingScreen = css`
  margin: 32px 64px;
  height: calc(100% - 32px - 32px);
  width: calc(100% - 64px - 64px);
  background: #D0253C;
  border-radius: 32px;
  box-shadow: -10px -10px 32px #f33a59, 10px 10px 32px #9E0019;
`;

