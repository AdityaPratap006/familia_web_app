import { css } from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const AddPostModalCSS = css`
    max-width: 95vw;
    top: 2vh;
    max-height: 96vh;

    @media (min-width: ${ScreenSize.SM_MIN}) {
        width: 50rem;
    }

`;