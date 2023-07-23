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
  border-radius: 16px;
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

    &:disabled {
      background: red;
    }
  }
`;

export const title = css`
  font-size: 2rem;
  font-weight: 800;
  color: ${colors.primary};
  margin: 0;
`;
