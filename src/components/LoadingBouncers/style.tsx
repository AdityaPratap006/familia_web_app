import styled, { keyframes } from 'styled-components';
import { pinkTheme } from '../../utils/theme';

export const BouncerContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    width: 6rem;
    height: 6rem;
`;

const bouncerAnimation = (heightInRem: number) => keyframes`
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-${heightInRem}rem);
    }
`;

export const BouncingBall = styled.div`
    width: 20%;
    height: 20%;
    background-color: ${props => props.theme.primary || pinkTheme.primary};
    border-radius: 50%;
    animation: ${bouncerAnimation(6)} 0.5s cubic-bezier(0.19, 0.57, 0.30, 0.98) infinite alternate;

    &:nth-child(2) {
        animation-delay: 0.1s;
        opacity: 0.8;
    }

    &:nth-child(3) {
        animation-delay: 0.2s;
        opacity: 0.6;
    }

    &:nth-child(4) {
        animation-delay: 0.3s;
        opacity: 0.4;
    }
`;