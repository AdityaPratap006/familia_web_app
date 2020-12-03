import React from 'react';
import { FormControl } from './style';

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
    errorText?: string;
}

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    errorText?: string;
}

export const TextFieldInput = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {

    const { errorText, ...nativeProps } = props;
    return (
        <FormControl className={`${props.errorText && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={nativeProps.id}
                type={nativeProps.type}
                placeholder={nativeProps.placeholder}
                autoComplete={nativeProps.autoComplete}
                disabled={nativeProps.disabled || false}
                ref={ref}
                {...nativeProps}
            />
            {<p>{props.errorText}</p>}
        </FormControl>
    );
});

export const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {

    const { errorText, ...nativeProps } = props;

    return (
        <FormControl className={`${props.errorText && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <textarea
                id={nativeProps.id}
                rows={nativeProps.rows || 3}
                placeholder={nativeProps.placeholder}
                ref={ref}
                {...nativeProps}
            />
            {<p>{props.errorText}</p>}
        </FormControl>
    );
});