import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const ChatWindowContainer = styled.div`
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    position: relative;
    border-left: 1px solid ${props => props.theme.defaultBorderColor};

    @media (max-width: ${ScreenSize.SM_MAX}) {
        border-left: none;
    }
`;

export const ChatWindowHeader = styled.header`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5rem;
    border-bottom: 1px solid ${props => props.theme.defaultBorderColor};
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const ChatWindowBody = styled.div`
    width: 100%;
    height: calc(100% - 9rem);
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.primary};
        width: 5px;
        border-radius: 100px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.paper};
    }
`;

export const ChatWindowFooter = styled.footer`
    width: 100%;
    height: 4rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid ${props => props.theme.defaultBorderColor};
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
`;

export const ChatHeaderContent = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const ChatHeaderTitle = styled.h2`
    padding: 0;
    margin: 0 1rem;
    font-size: 1.4rem;
    font-weight: bold;
    color: ${props => props.theme.primary};
`;