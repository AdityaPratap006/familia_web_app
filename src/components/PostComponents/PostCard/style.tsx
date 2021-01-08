import styled, { css } from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const PostCardCss = css`
    margin: 1rem 0;
    width: 90%;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        width: 100%;
    }
`;

export const PostHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 1rem;
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

export const PostBodyTitle = styled.h4`
    margin: 0.5rem 0;
    padding: 0;
    font-size: 1rem;
    color: ${props => props.theme.text};
    font-weight: bold;
`;

export const PostBodyContent = styled.p`
    margin: 0.5rem 0;
    padding: 0;
    font-size: 1rem;
    color: ${props => props.theme.text};
`;

export const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`;

export const PostLikesData = styled.span`
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.theme.primary};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const PostLikeButton = styled.button`
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    -webkit-tap-highlight-color: transparent;
    background: transparent;
    cursor: pointer;

    .icon {
        width: 1.8rem;
        height: auto;
        transition: 0.2s ease;

        &:hover {
            transform: scale(1.1);
        }

        &.unliked {
            color: ${props => props.theme.text};
        }
    }
`;