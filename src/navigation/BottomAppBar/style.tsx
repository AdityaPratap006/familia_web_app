import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const AppBar = styled.div`
    width: 90vw;
    padding: 0.5rem;
    border-radius: 200px;
    border: 2px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.appBarBackground};
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    box-shadow: 0px 13px 28px 0px rgba(18,17,18,0.23);

    // above mobile
    @media (min-width: ${ScreenSize.SM_MIN}) {
        display: none;
    }
`;

export const NavLinkList = styled.ul`
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const NavLinkItem = styled.li`
    margin: 0.5rem 0;
    /* padding: 1rem ; */
    /* height: 3rem; */
    display: flex;

    a {
        color: ${props => props.theme.text};
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        -webkit-tap-highlight-color: transparent;

        .nav-icon {
            width: 2rem;
            height: 2rem;
        }

        &.active {
            color: ${props => props.theme.primary};
        }
    }
`;