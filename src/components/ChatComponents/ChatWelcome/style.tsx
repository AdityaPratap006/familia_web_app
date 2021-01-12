import styled, { css } from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';
import CardImage from '../../../assets/chat-welcome.jpg';

export const WelcomeWindowContainer = styled.div`
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    position: relative;
    border-left: 1px solid ${props => props.theme.defaultBorderColor};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        border-left: none;
    }
`;

export const WelcomeCardCSS = css`
    width: 30rem;
    height: 20rem;
    background-image: url(${CardImage});
    background-position: center;
    background-size: contain;
    background-repeat: repeat;
    border: 3px solid ${props => props.theme.primary};
`;