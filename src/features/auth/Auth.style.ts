import { css } from "@emotion/react";
import { borderRadius, colors } from "../../ui";

export const authPage = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 32px);
  gap: 48px;
  min-height: fit-content;
  padding: 16px;
`;

export const authHeader = css`
  display: flex;
  align-items: center;
  gap: 24px;

  h1 {
    margin: 0;
    color: ${colors.white};
    font-weight: 900;
    font-size: 2rem;
    font-stretch: 151%;
    font-variation-settings: 
      'GRAD' 150,
      'slnt' -10,
      'XTRA' 468,
      'XOPQ' 96,
      'YOPQ' 79,
      'YTLC' 514,
      'YTUC' 712,
      'YTAS' 750,
      'YTDE' -203,
      'YTFI' 738,
      'opsz' 81;
  }
`;

export const authForm = css`
  padding: 56px;
  border-radius: ${borderRadius};
  background: ${colors.white};
  width: calc(500px - 56px * 2);
  max-width: calc(100% - 56px * 2);
  
  & > header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    h1 {
      color: ${colors.primary};
      letter-spacing: 0.1rem;
      font-weight: 800;
      font-size: 2rem;
      margin: 0;
    }

    p {
      margin: 0;
      color: ${colors.dark_primary};
      font-weight: 800;
    }
  }
`;
