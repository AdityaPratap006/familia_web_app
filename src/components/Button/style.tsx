import { Link } from 'react-router-dom';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { pinkTheme } from '../../utils/theme';

interface StyledButtonProps {
    addcss?: FlattenSimpleInterpolation;
}

const buttonStyles = css`
    font: inherit;
    padding: 0.75rem 1.5rem 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    background: ${props => props.theme.primary};
    color: white;
    cursor: pointer;
    margin-right: 1rem;
    text-decoration: none;
    display: inline-block;
    font-weight: 600;
    -webkit-tap-highlight-color: transparent;

    &:focus {
        outline: none;
    }

    &:hover {
        background: ${props => props.theme.primaryLight};

        &:disabled {
            background: #ccc;
            color: #979797;
            cursor: not-allowed;
        }
    }

    &:active {
        background: ${props => props.theme.primaryLight};
        border-color: ${props => props.theme.primaryLight};

        &:disabled {
            background: #ccc;
            color: #979797;
            cursor: not-allowed;
        }
    }

    &:disabled {
        background: #ccc;
        color: #979797;
        cursor: not-allowed;
    }

    &.button--inverse {
        background: transparent;
        color: ${props => props.theme.primary};
        border: 2px solid ${props => props.theme.primary};

        &:hover {
            color: white;
            background: ${props => props.theme.primary};
        }

        &:active {
            color: white;
            background: ${props => props.theme.primary};
        }
    }

    &.button--danger {
        background: #ff0000;

        &:hover {
            background: #eb4c4c;
        }

        &:active {
            background: #ec4646;
        }
    }

    &.button--small {
        font-size: 0.8rem;
    }

    &.button--big {
        font-size: 1.5rem;
    }
`;

export const StyledButton = styled.button<StyledButtonProps>`
    ${buttonStyles}
    ${props => props.addcss}
`;

export const StyledALink = styled.a<StyledButtonProps>`
    ${buttonStyles}
    ${props => props.addcss}
`;

export const StyledRouteLink = styled(Link) <StyledButtonProps>`
    ${buttonStyles}
    ${props => props.addcss}
`;

export const AuthButton = styled.button<StyledButtonProps>`
    font: inherit;
    font-weight: 600;
    text-decoration: none;
    padding: 0.75rem 1.5rem 0.5rem 1.5rem;
    border: 2px solid ${pinkTheme.primary};
    border-radius: 4px;
    background: #fff;
    color: ${pinkTheme.primary};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    
    &:focus {
        outline: none;
    }
    
    &:hover {
        background-color: ${pinkTheme.primary};
        color: #fff;
    }

    &:disabled {
        background: #ccc !important;
        color: #979797 !important;
        cursor: not-allowed !important;
    }

    ${props => props.addcss}
`;