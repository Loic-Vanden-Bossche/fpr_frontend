import { css } from "@emotion/react";
import { borderRadius, colors, outWhiteShadow } from "../../ui";

export const page = css`
  height: calc(100% - 32px - 40px);
  width: min(40rem, calc(100% - 32px - 32px));
  align-self: center;
  background: ${colors.white};
  border-radius: ${borderRadius};
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 16px;
`;

export const profilePicture = css`
  width: min(20rem, 100%);
  aspect-ratio: 1 / 1;
  margin: 0;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  align-self: center;
  position: relative;

  input {
    display: none;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 0.3s;
  }

  p {
    position: absolute;
    color: ${colors.white};
    font-size: 2rem;
    margin: 0;
    width: calc(100% - 16px);
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    text-transform: uppercase;
    text-align: center;
    font-weight: 800;
    opacity: 0;
    transition: 0.3s;
    user-select: none;
  }

  &:hover {
    img{
      filter: brightness(0.4);
    }
    p{
      opacity: 1;
    }
  }
`;

export const usernameForm = css`
  flex-direction: row;

  main {
    width: 100%;
    gap: 30px;
    header {
      font-size: 1.2rem;
      font-weight: 800;
      text-transform: capitalize;
    }
    input {
      border: hidden;
      border-bottom: 1px solid ${colors.grey};
      font-size: 1rem;
      font-weight: 300;
      padding: 8px 0;
      background: none;
    }
  }
  


  input[type=submit] {
    border: hidden;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 8px;
    border-radius: 16px;
    background: ${colors.primary};
    color: ${colors.white};
    ${outWhiteShadow}
  }
`;

export const title = css`
  font-size: 2rem;
  font-weight: 800;
  color: ${colors.primary};
  margin: 0;
`;

export const newGameForm = css`
  main{
    label {
      font-size: 1.2rem;
      font-weight: 800;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    & > div:not(.booleanInput) input {
      border: hidden;
      border-bottom: 1px solid ${colors.grey};
      font-size: 1rem;
      font-weight: 300;
      padding: 8px 0;
      background: none;
    }
    & > div {
      gap: 8px;
      accent-color: ${colors.primary};
    }
  }

  input[type=submit] {
    border: hidden;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 8px;
    border-radius: 16px;
    background: ${colors.primary};
    color: ${colors.white};
    ${outWhiteShadow}

    &:disabled {
      background: ${colors.pale_primary};
    }
  }
`;

export const gamesList = css`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const gameCard = css`
  padding: 8px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  background: ${colors.white};

  header, footer {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  h2 {
    font-size: 1.2rem;
    font-weight: 800;
    margin: 0;

    &::first-letter {
      text-transform: uppercase;
    }
  }
`;

export const gamePicture = css`
  position: relative;
  height: 64px;
  aspect-ratio: 1 / 1;
  background: red;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;

  img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 0.3s;
  }

  p{
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    margin: 0;
    font-size: 0.9rem;
    font-weight: 800;
    color: ${colors.white};
    opacity: 0;
    transition: 0.3s;
  }

  &:hover {
    img{
      filter: brightness(0.6);
    }
    p{
      opacity: 1;
    }
  }
`;
