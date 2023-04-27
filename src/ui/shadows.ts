import {css} from "@emotion/react";
import {colors} from "./values.ts";

export const outPrimaryShadow = css`
  box-shadow: -10px -10px 32px ${colors.light_primary}, 10px 10px 32px ${colors.dark_primary};
`

export const outPrimaryShadowSmall = css `
  box-shadow: -5px -5px 16px ${colors.light_primary}, 5px 5px 16px ${colors.dark_primary};
`

export const inPrimaryShadowSmall = css `
  box-shadow: inset -5px -5px 16px ${colors.light_primary}, inset 5px 5px 16px ${colors.dark_primary};
`

export const outWhiteShadow = css`
  box-shadow: -5px -5px 8px white, 5px 5px 8px #FFCAE8;
`