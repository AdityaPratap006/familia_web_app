import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

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
    padding: 0.45rem 1rem;
    border-radius: 0 10px 10px 10px;
    background-color: ${props => props.theme.paper};
    border: 1px solid ${props => props.theme.primary};
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 72%;
    
    &.sent {
        padding: 0.25rem 1rem;
        border-radius: 10px 0 10px 10px;
        background-color: ${props => props.theme.primary};
        border: 1px solid ${props => props.theme.primary};
        align-items: flex-end;
    }
`;

export const StyledMessageHeader = styled.header`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem 0 1rem 0;
 
`;

export const StyledMessageText = styled.p`
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
    color: ${props => props.theme.text};

    &.sent {
        color: #fff;
    }

    @media (max-width: ${ScreenSize.XS_MAX}) {
        font-size: 1.05rem;
    }
`;

export const StyledMessageTime = styled.small`
    padding: 0;
    margin: 0;
    font-size: 0.8rem;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1rem;
    color: ${props => props.theme.text};
    margin: 0 1rem 0 0;
    
    &.sent {
        color: #fff;
       
    }
`;