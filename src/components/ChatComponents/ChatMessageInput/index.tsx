import React from 'react';
import { useForm } from 'react-hook-form';
import { IoIosSend } from 'react-icons/io';
import { StyledChatMessageButton, StyledChatMessageForm, StyledChatMessageInput, StyledChatMessageInputContainer, StyledChatMessageInputError } from './style';

interface FormInput {
    text: string;
}

const ChatMessageInput = () => {

    const { formState, errors, register, handleSubmit, reset } = useForm<FormInput>({
        mode: "all",
    });

    const onFormSubmit = async (input: FormInput) => {
        console.log(input);
        reset();
    }

    return (
        <StyledChatMessageForm>
            <StyledChatMessageInputContainer>
                <StyledChatMessageInput
                    id="text"
                    name="text"
                    type="text"
                    ref={
                        register({
                            pattern: { value: /.*\S.*/, message: "Message cannot be empty" },
                            required: { value: true, message: "A message is required" },
                            maxLength: { value: 1500, message: "The messsge is too long" },
                        })
                    }
                    className={`${errors.text && 'error'}`}
                />
                {errors.text && <StyledChatMessageInputError>{errors.text?.message}</StyledChatMessageInputError>}
            </StyledChatMessageInputContainer>
            <StyledChatMessageButton
                disabled={!formState.isValid}
                type="submit"
                onClick={handleSubmit(onFormSubmit)}
            >
                <IoIosSend className="icon" />
            </StyledChatMessageButton>
        </StyledChatMessageForm>
    );
};

export default ChatMessageInput;
