import styled from 'styled-components';

export const FormControl = styled.div`
    margin: 1rem 0;
    width: 100%;

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: ${props => props.theme.primary};
    }

    input, select {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        background: transparent;
        color: ${props => props.theme.text};
        padding: 0.25rem;
        border-radius: 6px;

        &:focus {
            outline: none;
            /* background: #ebebeb; */
            border-color: ${props => props.theme.primary};
        }

        &:disabled {
            background: lightgray;
            color: #000;
        }
    }

    select {
        appearance: none;
        padding: 0.5rem;
        font-size: 1em;
        font-size-adjust: 0.3;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
            
        option {
            font-size: 1.4rem;
            padding: 5rem 0;
            background: ${props => props.theme.paper};
        }
    }

    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        border-radius: 6px;
        background: transparent;
        color: ${props => props.theme.text};
        padding: 0.15rem 0.25rem;
        white-space: pre-wrap;

        &:focus {
            outline: none;
            /* background: #ebebeb; */
            border-color: ${props => props.theme.primary};
        }
    }

    &.form-control--invalid {
        label {
            color: red;
        }

        p {
            color: red;
            margin-top: 0.2rem;
        }

        input, select {
            border-color: red;
            background: #ffd1d1;
            color: #000;
        }

        textarea {
            border-color: red;
            background: #ffd1d1;
            color: #000;
        }
    }
`;