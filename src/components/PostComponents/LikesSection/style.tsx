import styled from 'styled-components';

export const LikesSectionContainer = styled.div`
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


export const LikesData = styled.span`
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

export const LikeButton = styled.button`
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