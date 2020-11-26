import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { StyledButton, StyledALink, StyledRouteLink, AuthButton } from './style';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    size?: string;
    inverse?: boolean;
    danger?: boolean;
    to?: string;
    exact?: boolean;
    addcss?: FlattenSimpleInterpolation;
    authBtn?: boolean;
}

const Button: React.FC<ButtonProps> = props => {
    const buttonSizeStyleClass = `button--${props.size || 'default'}`;

    if (props.authBtn) {
        return (
            <AuthButton
                addcss={props.addcss}
                onClick={props.onClick}
                className={`${buttonSizeStyleClass} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'}`}
            >
                {props.children}
            </AuthButton>
        );
    }

    if (props.href) {
        return (
            <StyledALink
                className={`${buttonSizeStyleClass} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'}`}
                href={props.href}
                addcss={props.addcss}
            >
                {props.children}
            </StyledALink>
        );
    }

    if (props.to) {
        return (
            <StyledRouteLink
                to={props.to}
                className={`${buttonSizeStyleClass} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'}`}
                addcss={props.addcss}
            >
                {props.children}
            </StyledRouteLink>
        );
    }

    return (
        <StyledButton
            className={`${buttonSizeStyleClass} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
            addcss={props.addcss}
        >
            {props.children}
        </StyledButton>
    );
};

export default Button;
