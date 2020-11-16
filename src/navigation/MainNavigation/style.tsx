import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const MainContainer = styled.main`
    margin-left: 25%;
    width: 75%;
    min-height: 100vh;
    background-color: ${props => props.theme.background};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    //tablet
    @media (max-width: ${ScreenSize.SM_MAX}) {
        margin-left: 10%;
        width: 90%;
    }

    // mobile
    @media (max-width: ${ScreenSize.XS_MAX}) {
        margin-left: 0;
        width: 100%;
    }
`;