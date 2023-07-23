import { css } from "@emotion/react";

export const inputStyle = css`
    width: 100%;

    header {
        display: flex;
        height: 24px;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;

        label, .revealButton {
            user-select: none;
        }
    }

    input {
        width: calc(100% - 4px);
        padding: 0;
        margin: 0;
    }
`;

export const checkboxStyle = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;

    input {
        padding: 0;
        margin: 0;
    }
`;
