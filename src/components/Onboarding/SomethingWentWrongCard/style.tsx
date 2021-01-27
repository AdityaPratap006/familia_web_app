import styled, { css } from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const CardCSS = css`
    padding: 0rem;
    min-width: 30rem;
    max-width: 95vw;
    height: 24rem;
    background: ${props => props.theme.paper};
    border: 3px solid ${props => props.theme.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        min-width: 10rem;
    }
`;

export const StyledCardBody = styled.div`
    padding: 1rem;
    margin: 1rem;
    font-size: 2.4rem;
    color: ${props => props.theme.text};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
     
`;
