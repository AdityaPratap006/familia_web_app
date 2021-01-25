import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const StyledPostMenu = styled.div`
    position: absolute;
    right: -1rem;
    top: 2rem;
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.defaultBorderColor};
    border-radius: 8px;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 0rem;
    
    &.hidden {
        display: none;
    }
`;

export const PostMenuItemList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
`;

export const PostMenuItem = styled.li`
    padding: 0.5rem 0.75rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    outline: none;
    border: none;
    background: transparent;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.primaryShadow};
    }
`;

export const PostMenuItemIconContainer = styled.div`
    margin-right: 0.5rem;

    .icon {
        width: 1.4rem;
        height: 1.4rem;
        color: ${props => props.theme.text};
    }
`;

export const PostMenuItemLabel = styled.span`
    font-size: 0.8rem;
    font-weight: bold;
    color: ${props => props.theme.text};
    margin-left: 1.2rem;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        margin-left: 0.9rem;
    }
`;