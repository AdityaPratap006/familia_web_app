import styled, { css } from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const OnboardingAddMemberCardCSS = css`
    margin: 0 0 1rem 0;
    width: 90%;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        width: 100%;
    }
`;

export const StyledTitle = styled.h4`
    padding: 0rem;
    margin: 1rem 0;
    color: ${props => props.theme.text};
`;