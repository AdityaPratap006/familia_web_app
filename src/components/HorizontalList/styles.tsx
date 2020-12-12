import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const StyledArrow = styled.button`
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${props => props.theme.primary};
    cursor: pointer;
    margin: auto 0 auto 0;

    &:disabled {
        background-color: ${props => props.theme.primaryShadow};
        cursor: not-allowed;
    }

    @media (max-width: ${ScreenSize.SM_MAX}) {
        display: none;
    }
`;
