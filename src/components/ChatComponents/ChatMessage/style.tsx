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
`;

export const StyledMessageAvatarContainer = styled.div`
    margin: 0 0.5rem;
`;

export const StyledMessageCard = styled.div`
    padding: 1rem;
    border-radius: 0 10px 10px 10px;
    background-color: ${props => props.theme.paper};
    border: 1px solid ${props => props.theme.defaultBorderColor};
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    
    &.sent {
        border-radius: 10px 0 10px 10px;
        background-color: ${props => props.theme.primary};
        border: 1px solid ${props => props.theme.primary};
    }
`;
export const StyledMessageText = styled.p`
    padding: 0;
    margin: 0;
    font-size: 1rem;
    color: ${props => props.theme.text};

    &.sent {
        color: #fff;
    }
`;