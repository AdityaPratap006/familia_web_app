import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const StyledAddPostButton = styled.button`
    outline: none;
    border: 2px solid ${props => props.theme.primary};
    padding: 1rem 1rem 0.75rem 1rem;
    margin: 0;
    z-index: 40;
    cursor: pointer;
    background: transparent;
    border-radius: 20px;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        box-shadow: 0px 0px 6px 3px ${props => props.theme.text === `#000` ? props.theme.primaryShadow : props.theme.primaryLight};
    }

    .icon {
        display: none;
    }

    @media (max-width: ${ScreenSize.SM_MAX}) {
        padding: 0.1rem;
        position: fixed;
        bottom: 130px;
        right: 20px;    
        background: ${props => props.theme.primary};
        border-radius: 50%;
        width: 3.6rem;
        height: 3.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 2px 8px 0 ${props => props.theme.primaryLight}; 
        
        .icon {
            display: block;
            width: 2.1rem;
            height: 2.1rem;
            color: #fff;
        }

        &:hover {
            box-shadow: 0px 2px 8px 0 ${props => props.theme.primaryLight};
        }
    }
`;

export const AddPostButtonText = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.theme.primary};
    font-family: inherit;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        display: none;
    }
`;