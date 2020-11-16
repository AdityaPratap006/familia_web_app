import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const AsideDrawer = styled.aside`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
    height: 100vh;
    width: 25rem;
    max-width: 80vw;
    border-right: 1px solid ${props => props.theme.defaultBorderColor};
    background-color: ${props => props.theme.paper};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    // tablet-laptop-desktop
    @media (min-width: ${ScreenSize.SM_MIN}) {
        display: none;
    }

    &.slide-in-left__enter-active {
        transform: translateX(-100%);
        opacity: 0;
    }

    &.slide-in-left__enter-done { 
        transform: translateX(0);
        opacity: 1;
        transition: all 200ms;
    }

    &.slide-in-left__exit-active {
        transform: translateX(0);
        opacity: 1;
    }

    &.slide-in-left__exit {
        transform: translateX(-100%);
        opacity: 0;
        transition: all 200ms;
    }
`; 