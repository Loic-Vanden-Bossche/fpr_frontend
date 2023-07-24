import { css } from "@emotion/react";
import { colors, inPrimaryShadowSmall, inWhiteShadow, outPrimaryShadowSmall } from "../../ui";

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
    ${outPrimaryShadowSmall}
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
      #00000000 1%,
      #FFFFFF18 1.001%,
      #FFFFFF18 48.999%,
      #00000000 49%,
      
      #00000000 60%,
      #FFFFFF18 60.001%,
      #FFFFFF18 60.999%,
      #00000000 61%,
      
      #00000000 62%,
      #FFFFFF18 62.001%,
      #FFFFFF18 67.999%,
      #00000000 68%,
      
      #00000000 70%,
      #FFFFFF18 70.001%,
      #FFFFFF18 75.999%,
      #00000000 76%,
      
      #00000000 79%,
      #FFFFFF18 79.001%,
      #FFFFFF18 91.999%,
      #00000000 92%
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

export const chat = css`
  border-radius: 32px;
  resize: horizontal;

  @media screen and (max-width: 950px) {
    resize: vertical;
    min-width: calc(100% - 48px);
    max-width: calc(100% - 48px);
  }
  @media screen and (min-width: 950px) {
    min-height: calc(100% - 48px);
    max-height: calc(100% - 48px);
  }
`;
