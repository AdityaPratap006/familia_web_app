import styled from 'styled-components';

export const StyledChatMessageForm = styled.form`
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    display: flex;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const StyledChatMessageInputContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const StyledChatMessageInput = styled.input`
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid ${props => props.theme.primary};
    outline: none;
    -webkit-tap-highlight-color: transparent;
    background: transparent;
    color: ${props => props.theme.text};
    padding: 0.5rem;
    border-radius: 200px;

    &.error {
        border-color: red;
        background: #ffd1d1;
        color: #000;
    }
`;

export const StyledChatMessageInputError = styled.p`
    color: red;
    margin-top: 0.2rem;
    font-size: 0.9rem;
    font-weight: bold;
`;

export const StyledChatMessageButton = styled.button`
    margin: 0 0.5rem;
    padding: 0.2rem;
    background: ${props => props.theme.primary};
    border: none;
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 200px;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);

    &:hover {
        cursor: pointer;
    }

    &:disabled {
        display: none;
    }

    .icon {
        width: 80%;
        height: 80%;
        color: #fff;
    }
`;