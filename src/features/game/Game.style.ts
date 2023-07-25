import { css } from "@emotion/react";
import { colors, inPrimaryShadowSmall, inWhiteShadow, outPrimaryFilter, outPrimaryShadowSmall } from "../../ui";

export const gameDisplay = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 32px);
  width: 100%;
  padding: 16px;
  border-radius: 32px;

  .screen {
    height: 100% !important;
    border-radius: 16px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: ${colors.white};
    ${inWhiteShadow}
  }
  svg {
    width: 100%;
    max-width: fit-content;
    height: fit-content;
    max-height: 100%;
  }
  @media screen and (max-width: 950px) {
    width: calc(100% - 32px);
  }
`;

export const form = css`
  flex-direction: row;
  main {
    width: 100%;
    header {
      display: none;
    }
    
    input {
      width: calc(100% - 16px);
      background: ${colors.white};
      border-radius: 17px;
      border: hidden;
      font-size: 1rem;
      padding: 8px;
      ${inWhiteShadow}
    }
  }
  input[type=submit] {
    background: ${colors.primary};
    border-radius: 17px;
    border: hidden;
    font-size: 1rem;
    color: ${colors.white};
    ${outPrimaryShadowSmall};
    padding: 8px;
    transition: 0.3s;

    &:active{
      ${inPrimaryShadowSmall}
    }
    
    &:disabled{
      box-shadow: none;
      cursor: not-allowed;
    }
  }
`;

export const startScreen = css`
  @keyframes loadUpDown {
    0% {
      translate: 0 0;
    }
    10% {
      translate: 0 0;
    }
    50% {
      translate: 0 -1.5rem;
    }
    90% {
      translate: 0 0;
    }
    100% {
      translate: 0 0;
    }
  }
  height: 100%;
  width: calc(100% - 64px);
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  border-radius: 16px;
  padding: 32px;
  gap: 32px;
  overflow: hidden;

  p{
    font-size: 4rem;
    font-weight: 800;
    color: ${colors.white};
    text-align: center;
    margin: 0;
  }
  
  button{
    font-size: 3rem;
    font-weight: 800;
    color: ${colors.white};
    text-align: center;
    margin: 0;
    padding: 8px;
    z-index: 1;
    cursor: pointer;

    background: none;
    border: none;
    border-radius: 8px;

    &:hover{
      outline: solid 4px ${colors.white};
    }
  }

  .loader{
    display: flex;
    gap: 1.2rem;
    p{
      animation: loadUpDown 1.5s infinite;

      &:nth-of-type(2) {
        animation-delay: 0.3s;
      }
      
      &:nth-of-type(3) {
        animation-delay: 0.6s;
      }
    }
  }

  .veil{
  @keyframes screenScroll {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 2000px;
    }
  }
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(
      #00000000 0%,
      #FFFFFF18 0.001%,
      #FFFFFF18 59.999%,
      #00000000 60%
    );
    background-repeat: repeat-y;
    animation: screenScroll 10s infinite linear;
    background-size: 100% 50%;
    filter: blur(5px);
  }
`;

export const linearLayout = css`
  display: flex;
  width: 100%;
  height: calc(100% - 32px - 40px);
  gap: 32px;

  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
`;

export const horizontalLayout = css`
  display: flex;
  gap: 32px;
`;

export const verticalLayout = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const stateButton = css`
  background: ${colors.primary};
  border-radius: 17px;
  border: hidden;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${colors.white};
  ${outPrimaryShadowSmall}
  padding: 16px;
  transition: 0.3s;
  width: 100%;

  &:active{
    ${inPrimaryShadowSmall}
  }
  
  &:disabled{
    box-shadow: none;
    cursor: not-allowed;
  }
`;

export const chat = css`
  border-radius: 32px;
  width: 400px;

  @media screen and (max-width: 950px) {
    height: 300px;
    width: calc(100% - 48px);
  }
`;

export const historyStyle = css`
  width: 100%;
  position: relative;
`;

export const range = css`
  accent-color: ${colors.dark_primary};
  transition: 0.3s;
  width: 100%;

  ${outPrimaryFilter}
  &:hover {
    accent-color: ${colors.light_primary};  
  }
`;

export const cursors = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;

  .tick{
    cursor: pointer;
    height: 15px;
    width: 15px;
    background: ${colors.white};
    border-radius: 50%;
    ${outPrimaryShadowSmall}
  }
`;

export const leaderBoard = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  p{
    font-size: 1rem;
    font-weight: 800;
    margin: 0;
    color: ${colors.white};
  }
  img {
    height: 30px;
    width: 30px;
    object-fit: cover;
    border-radius: 50%;
  }
  div{
    display: flex;
    gap: 16px;
    align-items: center;
  }
`;
