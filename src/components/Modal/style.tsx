import styled from 'styled-components';
import { DefaultTheme, FlattenInterpolation, FlattenSimpleInterpolation, ThemeProps } from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

interface ModalContainerProps {
    overSideDrawer?: boolean;
    addcss?: FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

export const ModalContainer = styled.div<ModalContainerProps>`
    z-index: ${props => props.overSideDrawer ? 300 : 100};
    position: fixed;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 8px;
    overflow: hidden;
    background-color: ${props => props.theme.background};

    @media (min-width: ${ScreenSize.SM_MIN}) {
        width: 30rem;
    }

    ${props => props.addcss}

    &.modal-enter-active {
        transform: translateY(-10rem) translateX(-50%);
        opacity: 0;
    }
    
    &.modal-enter-done {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
        transition: all 200ms;
    }

    &.modal-exit-active {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
    }
        
    &.modal-exit {
        transform: translateY(-10rem) translateX(-50%);
        opacity: 0;
        transition: all 200ms;
    }
`;

export const ModalHeader = styled.header`
    width: 100%;
    padding: 1rem 0.5rem;
    background: ${props => props.theme.primary};
    color: white;

    h2 {
        margin: 0.5rem;
    }
`;

export const ModalContent = styled.div`
    background: ${props => props.theme.background};
    padding: 1rem 0.5rem;
    max-height: 70vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.background};
    }

    &::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: ${props => props.theme.primary};
    }
`;

export const ModalFooter = styled.footer`
    background: ${props => props.theme.background};
    padding: 1rem 0.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;