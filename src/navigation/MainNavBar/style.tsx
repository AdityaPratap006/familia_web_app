import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const StyledHeader = styled.header`
    padding: 3rem 1rem;
    width: 20vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${props => props.theme.background};
    border-right: 1px solid ${props => props.theme.defaultBorderColor};
    z-index: 50;
    overflow: hidden;

    // tablet
    @media (max-width: ${ScreenSize.SM_MAX}) {
        width: 10vw;
        padding: 3rem 0.5rem;
    }

    // mobile
    @media (max-width: ${ScreenSize.XS_MAX}) {
        display: none;
    }
`;