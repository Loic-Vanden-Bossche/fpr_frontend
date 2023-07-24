import { css } from "@emotion/react";
import { colors } from "./values.ts";

export const gamesStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  gap: 16px;
`;

export const gamesCard = css`
  background: ${colors.primary};
  border-radius: 16px;
  width: 164px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  cursor: pointer;
`;

export const gamesResultContainer = css`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${colors.white};
  font-size: 2rem;
  text-align: center;
  align-items: center;
  
  h1 {
    margin: 0;
  }
  
  h2 {
    margin: 0;
  }
  
  button {
    margin: 0 auto;
    margin-top: 40px;
  }
`;

export const gamesResultImage = css`
  border-radius: 20px;
  width: 50%;
`;

