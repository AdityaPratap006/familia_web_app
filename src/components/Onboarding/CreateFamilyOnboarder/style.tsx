import styled, { css } from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';
import WeBareBearsImage from '../../../assets/bears-night.jpg';

export const CardCSS = css`
    padding: 0rem;
    max-width: 30rem;
    height: 24rem;
    background-image: url(${WeBareBearsImage});
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
    border: 3px solid ${props => props.theme.primary};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
`;

export const StyledCardBody = styled.div`
    padding: 1rem;
    font-size: 2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.6);
`;

export const StyledText = styled.p`
    font-size: 0.9rem;
    color: #fff;
    padding: 0.25rem;
    margin: 0.5rem 0 0 0;
`;

export const StyledQuote = styled.p`
    font-size: 1rem;
    font-style: italic;
    font-weight: bold;
    color: ${props => props.theme.primaryLight};
    padding: 0.25rem;
    margin: 0;
`;

export const StyledImage = styled.img`
    width: 20rem;
    height: 20rem;
    margin: 0 auto;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        width: 12rem;
        height: 12rem;
    }
`;

export const StyledCardFooter = styled.footer`
    padding: 1rem;
    margin-top: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.6));
`;