import { css } from "@emotion/react";
import { colors } from ".";

export const formStyle = css`
    &,input[type=submit] {margin-top: 40px}

    main {
        label, .revealButton {
            transition: 0.2s ease-in-out;
        }

        label {
            font-size: 1.2rem;
            font-weight: 600;
            text-transform: capitalize;
            color: ${colors.pale_primary};
            pointer-events: none;
        }
        
        .revealButton {
            fill: ${colors.pale_primary};
            &:hover {
                fill: ${colors.dark_primary};
            }
        }

        input {
            width: 100%;
            background: none;
            border: hidden;
            border-bottom: 1px solid ${colors.grey};
            font-size: 1rem;
            padding-block: 8px;
        }

        .error {
            border-radius: 0 0 10px 10px;
        }

        .textInput {
            &:has(input[value=""]:not(:focus)) {
                label, .revealButton {
                translate: 0 calc(1.2rem + 8px);
                }
            }
            &:has(input:focus) {
                label, .revealButton {
                    color: ${colors.primary};
                    fill: ${colors.primary};
                }
            }
        }
    }

    input[type=submit]{
        padding: 16px;
        background: ${colors.primary};
        border: hidden;
        border-radius: 32px;
        
        font-weight: 800;
        font-size: 1.2rem;
        color: ${colors.white};
    }
`;
