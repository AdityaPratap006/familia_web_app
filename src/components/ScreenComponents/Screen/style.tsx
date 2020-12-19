import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

interface ScreenContentProps {
    stackedUpScreen?: boolean;
}

export const ScreenContent = styled.div<ScreenContentProps>`
    /* padding-top: 5rem; */
    /* flex: 1; */
    padding: 2rem 1rem 2rem 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${props => props.theme.background};
    z-index: ${props => props.stackedUpScreen ? 30 : 0};

    @media (max-width: ${ScreenSize.XS_MAX}) {
        padding-bottom: 6rem;
    }
`;
