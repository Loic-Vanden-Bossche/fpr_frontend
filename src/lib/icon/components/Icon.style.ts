import { css } from "@emotion/react";

export const iconStyle = (color: string, size: string) => css`
  fill: ${color};
  height: ${size};
  max-width: ${size};
  min-width: ${size};
  
  svg {
    height: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;
