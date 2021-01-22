import styled from 'styled-components';

export const VideoCallContainer = styled.div`
    z-index: 300;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: hidden;
    background-color: ${props => props.theme.background};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;


    &.VideoCall-enter-active {
        transform: translateY(-100vh);
        opacity: 0;
    }
    
    &.VideoCall-enter-done {
        transform: translateY(0);
        opacity: 1;
        transition: all 200ms;
    }

    &.VideoCall-exit-active {
        transform: translateY(0);
        opacity: 1;
    }
        
    &.VideoCall-exit {
        transform: translateY(-100vh);
        opacity: 0;
        transition: all 200ms;
    }
`;

export const VideoCallHeader = styled.header`
    width: 100%;
    padding: 0.5rem;
    background: ${props => props.theme.primary};
    color: white;

    h2 {
        margin: 0.5rem 0 0 0;
        padding: 0;
        font-size: 1.4rem;
    }
`;

export const VideoCallContent = styled.div`
    flex: 1;
    width: 100%;
    background: ${props => props.theme.background};
`;

export const VideoCallFooter = styled.footer`
    width: 100%;
    background: ${props => props.theme.background};
    padding: 1rem 0.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;