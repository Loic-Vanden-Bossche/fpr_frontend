import {css} from "@emotion/react";
import {colors} from "../../ui";

export const loginPage = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const loginHeader = css`
  display: flex;
  align-item: center;
  gap: 24px;

  h1 {
    margin: 0;
    color: ${colors.white};
    font-weight: 900;
    font-size: 2rem;
    font-stretch: 151%;
    font-variation-settings: 'GRAD' 150, 'slnt' -10, 'XTRA' 468, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'opsz' 81;
  }
`;