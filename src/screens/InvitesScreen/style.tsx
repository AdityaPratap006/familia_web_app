import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const InvitesScreenContent = styled.div`
    width: 100%;
`;

export const InvitesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const InvitesTabsHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.primary};
`;

export const InvitesTab = styled.button`
    margin: 0;
    padding: 0.8rem 2rem;
    outline: none;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    background: ${props => props.theme.background};
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.theme.primary};
    border: none;
    font-family: inherit;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    &.active {
        background: ${props => props.theme.primary};
        color: #fff;
    }

    &:hover {
        cursor: pointer;
    }
`;

export const InvitesGrid = styled.div`
    padding-top: 1rem;
    width: 100%;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: ${ScreenSize.SM_MAX}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${ScreenSize.XS_MAX}) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

