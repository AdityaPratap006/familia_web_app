import styled from 'styled-components';

export const VideoCallButton = styled.button`
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0.5rem 1.2rem 0.5rem auto;
    background-color: transparent;
    cursor: pointer;

    .icon {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        color: ${props => props.theme.primary};
    }
`;