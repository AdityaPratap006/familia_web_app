import styled from 'styled-components';
import { pinkTheme } from '../../../utils/theme';

export const LikesSectionContainer = styled.div`
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

export const LikesAvatarContainer = styled.div`
    width: 100%;
    margin: 0.5rem 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const LikeAvatar = styled.div`
    margin: 0 0.25rem 0 0;
`;

export const RemainingLikesText = styled.span`
    padding: 0;
    margin: 0 0.25rem;
    color: ${props => props.theme.text};
    font-weight: bold;
`;

export const LikesData = styled.span`
    margin: 0.5rem 0;
    padding: 0;
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.theme.primary};
    cursor: pointer;
`;

export const LikeButton = styled.button`
    margin: 0.5rem 0;
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

        &.liked {
            color: ${pinkTheme.primary};
        }
    }
`;