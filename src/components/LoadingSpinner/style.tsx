import styled, { keyframes } from 'styled-components';
import { pinkTheme } from '../../utils/theme';

export const SpinnerContainer = styled.div`
    position: relative;

    &.small {
        width: 2.4rem;
        height: 2.4rem;
    }

    &.medium {
        width: 4rem;
        height: 4rem;
    }

    &.large {
        width: 7rem;
        height: 7rem;
    }
`;

const spinAnimation1 = keyframes`
    0% {
        transform: rotate(0deg);
        border-width: 6px;
    }

    50% {
        transform: rotate(180deg);
        border-width: 1px;
    }

    100% {
        transform: rotate(360deg);
        border-width: 6px;
    }
`; 

const spinAnimation2 = keyframes`
    0% {
        transform: rotate(0deg);
        border-width: 1px;
    }

    50% {
        transform: rotate(180deg);
        border-width: 6px;
    }

    100% {
        transform: rotate(360deg);
        border-width: 1px;
    }
`; 

export const Arc = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 6px solid transparent;
    border-top-color: ${props => props.theme.primary || pinkTheme.primary};
    border-radius: 50%;
    animation: ${spinAnimation1} 1.2s linear infinite;

    &.second {
        border: 6px solid transparent;
        border-bottom-color: ${props => props.theme.primary || pinkTheme.primary};
        animation: ${spinAnimation2} 1.2s linear infinite;
    }
`;