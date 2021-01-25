import styled from 'styled-components';

export const StyledMessageContainer = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    &.sent {
        flex-direction: row-reverse;
    }

    &.optimistic {
        opacity: 0.4;
    }

    &.long-pressed {
        background-color: ${props => props.theme.primaryShadow};
    }
`;

export const StyledMessageAvatarContainer = styled.div`
    margin: 0 0.5rem;
`;

export const StyledMessageCard = styled.div`
    padding: 1rem 1rem 0.2rem 1rem;
    border-radius: 0 10px 10px 10px;
    background-color: ${props => props.theme.paper};
    border: 1px solid ${props => props.theme.defaultBorderColor};
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
    &.sent {
        border-radius: 10px 0 10px 10px;
        background-color: ${props => props.theme.primaryShadow};
        border: 1px solid ${props => props.theme.primary};
        align-items: flex-end;
    }
`;

export const StyledMessageText = styled.p`
    padding: 0;
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: ${props => props.theme.text};
`;

export const StyledMessageTime = styled.small`
    padding: 0;
    font-size: 0.75rem;
    font-weight: bold;
    color: ${props => props.theme.text};
`;