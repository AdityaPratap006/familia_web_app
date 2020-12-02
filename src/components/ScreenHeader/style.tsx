import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const HeaderBarWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
`;

export const HeaderBar = styled.header`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.defaultBorderColor};
    padding: 0.5rem 1rem;
    background-color: ${props => props.theme.background};
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        /* flex-direction: column; */
    }
`;



export const Title = styled.h2`
    font-weight: bold;
    font-size: 1.5rem;
    color: ${props => props.theme.text};
    margin: 0.5rem 1.5rem 0.5rem 0.5rem;
    text-transform: capitalize;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        font-size: 1.36rem;
    }
`;

export const SubTitle = styled.div`

`;

export const RightElement = styled.div`
    margin-left: auto;
    margin-right: 1rem;
`

export const MenuButton = styled.button`
    border: none;
    border-radius: 50%;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0.5rem 1rem 0.5rem 0.5rem;
    background-color: transparent;
    cursor: pointer;
    
    .icon {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
        color: gray;
    }

    @media (min-width: ${ScreenSize.SM_MIN}) {
        display: none;
    }
`;

export const GoBackButton = styled.button`
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0.5rem;
    background-color: transparent;
    cursor: pointer;
    
    .icon {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        color: ${props => props.theme.primary};
    }

    @media (min-width: ${ScreenSize.LG_MIN}) {
        display: none;
    }
`;