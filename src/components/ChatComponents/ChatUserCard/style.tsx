import styled, { css } from 'styled-components';

export const ChatUserCardContainer = styled.div`
    width: 100%;
    padding: 0.5rem;
    transition: 0.3s linear;

    &:hover {
        transform: scale(1.035);
    }
`;

export const ChatUserCardCSS = css`
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const ChatUserCardAvatarContainer = styled.div`
    padding: 0.5rem;
`;

export const ChatUserCardContent = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
`;

export const ChatUserCardName = styled.span`
    padding: 0;
    margin-bottom: 0.25rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.theme.text};
    max-width: 9rem;
    min-width: 6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;