import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const MainContainer = styled.main`
    margin-left: 20vw;
    width: 80vw;
    min-height: 100vh;
    background-color: lightpink;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    //tablet
    @media (max-width: ${ScreenSize.SM_MAX}) {
        margin-left: 10vw;
        width: 90vw;
    }

    // mobile
    @media (max-width: ${ScreenSize.XS_MAX}) {
        margin-left: 0;
        width: 100vw;
    }
`;