import { css } from "@emotion/react";

export const textInputStyle = css`
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
