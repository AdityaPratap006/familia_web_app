import styled from 'styled-components';

export const InvitesScreenContent = styled.div`
    width: 100%;
    padding: 1rem;
`;

export const InviteButtonContainer = styled.div`
    width: 100%;
    padding: 0 0 2rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const InvitesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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

export const InvitesLoadingContainer = styled.div`
    width: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NoInvitesText = styled.p`
    color: ${props => props.theme.text};
    font-size: 1rem;
    width: 100%;
    padding: 2rem;
    margin: 0;
`;