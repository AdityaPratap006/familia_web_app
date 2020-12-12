import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const StyledArrow = styled.button`
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    border-radius: 100%;
    background-color: transparent;
    cursor: pointer;
    margin: auto 0;
    padding: 0;
    
    .icon {
        color: ${props => props.theme.primary};
        font-size: 1.8rem;
    }

    &:disabled {
        display: none;
    }

    @media (max-width: ${ScreenSize.SM_MAX}) {
        display: none;
    }
`;
