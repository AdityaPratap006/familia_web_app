import styled from 'styled-components';

export const BackDropContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.text};
    opacity: 0.25;
    z-index: 80;

    &.enter-active {
        opacity: 0;
    }

    &.enter-done {
        opacity: 0.25;
        transition: all 300ms;
    }

    &.exit-active {
        opacity: 0.25;
    }

    &.exit {
        opacity: 0;
        transition: all 300ms;
    }
`;