import React from 'react';
import { FormControl } from './style';

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
    errorText?: string;
}

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    errorText?: string;
}

export const CustomInput: React.FC<TextFieldProps> = ({ children, ...props }) => {
    const { errorText, label, id } = props;
    return (
        <FormControl className={`${errorText && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label}</label>
            {children}
            {<p>{errorText}</p>}
        </FormControl>
    ); 
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

export interface TextSelectOption {
    key: string;
    value: string;
}

interface TextSelectProps extends React.HTMLProps<HTMLSelectElement> {
    errorText?: string;
    optionList: TextSelectOption[];
}

export const TextSelectInput = React.forwardRef<HTMLSelectElement, TextSelectProps>((props, ref) => {

    const { errorText, optionList, ...nativeProps } = props;

    return (
        <FormControl className={`${props.errorText && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <select
                id={nativeProps.id}
                ref={ref}
                {...nativeProps}
            >
                {
                    optionList.map((op) => (
                        <option key={op.key} value={op.value}>
                            {op.value}
                        </option>
                    ))
                }
            </select>
            {<p>{props.errorText}</p>}
        </FormControl>
    );
});