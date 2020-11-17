import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

interface ScreenContentProps {
    stackedUpScreen?: boolean;
}

export const ScreenContent = styled.div<ScreenContentProps>`
    padding-top: 5rem;
    /* flex: 1; */
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${props => props.theme.background};
    padding-bottom: 2rem;
    z-index: ${props => props.stackedUpScreen ? 30 : 0};

    @media (max-width: ${ScreenSize.XS_MAX}) {
        padding-bottom: 6rem;
    }
`;
