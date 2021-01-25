import styled, { css } from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const PostCardCss = css`
    margin: 0 0 1.5rem 0;
    width: 90%;
    padding: 0;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        width: 100%;
    }

    &.post-card-enter-active {
        transform: translateY(0) translateX(-100vw);
        opacity: 0;
    }
    
    &.post-card-enter-done {
        transform: translateY(0) translateX(0);
        opacity: 1;
        transition: all 200ms;
    }

    &.post-card-exit-active {
        transform: translateY(0) translateX(0);
        opacity: 1;
    }
        
    &.post-card-exit {
        transform: translateY(0) translateX(-100vw);
        opacity: 0;
        transition: all 200ms;
    }
`;

export const PostHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
`;

export const PostHeaderAuthorAvatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 0.5rem;
`;

export const PostHeaderAuthorName = styled.span`
    font-size: 1.1rem;
    font-weight: bold;
    color: ${props => props.theme.primary};
    padding-left: 0.5rem;
`;

export const PostBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const PostBodyDate = styled.small`
    font-size: 0.9rem;
    font-family: 'roboto';
    color: ${props => props.theme.text};
    padding: 0 1rem;
    margin: 0.5rem 0;
`;

export const PostBodyTitle = styled.h4`
    margin: 0.5rem 0;
    padding: 0 1rem;
    font-size: 1rem;
    color: ${props => props.theme.text};
    font-weight: bold;
`;

export const PostBodyContent = styled.p`
    margin: 0.5rem 0;
    padding: 0 1rem;
    font-size: 1rem;
    color: ${props => props.theme.text};
`;

export const PostBodyImage = styled.img`
    width: 100%;
    margin: 0.5rem 0;
`;

export const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0 1rem;
`;



