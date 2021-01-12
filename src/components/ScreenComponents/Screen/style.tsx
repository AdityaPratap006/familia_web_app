import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

interface ScreenContentProps {
    withoutBottomAppBar?: boolean;
    withBottomPaddingInMobile?: boolean;
}

export const ScreenContent = styled.div<ScreenContentProps>`
    /* padding-top: 5rem; */
    /* flex: 1; */
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${props => props.theme.background};
    /* z-index: ${props => props.withoutBottomAppBar ? 30 : 0}; */

    @media (max-width: ${ScreenSize.XS_MAX}) {
        padding-bottom: ${props => props.withBottomPaddingInMobile ? `6rem` : `0rem`};
    }
`;
