import { css } from "@emotion/react";

export const formStyle = css`
    display: flex;
    flex-direction: column;
    gap: 16px;

    main > :not(:first-child, .error) {
        margin-top: 16px;
    }

    input[type=submit] {
        cursor: pointer;
    }
`;
