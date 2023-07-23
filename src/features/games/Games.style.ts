import { css } from "@emotion/react";
import { colors } from "../../ui";

export const modal = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 0;
  transition: 0.3s;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-inline: -24px;
  margin-block: 0;
  padding-inline: 24px;
  padding-block: 0;
`;

export const visible = css`
  height: 480px;
  padding-bottom: 16px;
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
  box-shadow: none;
`;

export const gameCard = (gameId: string) => css`
  background: ${colors.white};
  background-image: url(https://medias.flash-player-revival.net/p/${gameId});
  border-radius: 16px;
  width: calc(100% - 32px);
  aspect-ratio: 16 / 9;
  display: flex;
  position: relative;
  padding: 16px;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  h2, p {
    margin: 0;
  }
`;

export const gameLoading = css`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: default;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  
  div {
    border-radius: 100%;
    border: 2px gray solid;
    border-bottom: 2px solid transparent;
    width: 24px;
    height: 24px;
    animation: spin 1000ms infinite linear;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }
`;
