import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import { CREATE_MESSAGE_MUTATION } from '../../../graphql/message/mutations';
import { GET_ALL_CHAT_MESSAGES } from '../../../graphql/message/queries';
import { IMessage, MessageUser } from '../../../models/message';
import LoadingSpinner from '../../LoadingSpinner';
import { StyledChatMessageButton, StyledChatMessageForm, StyledChatMessageInput, StyledChatMessageInputContainer, StyledChatMessageInputError } from './style';

interface FormInput {
    text: string;
}

interface CreateMessageResult {
    createMessage: IMessage;
}

interface ChatMessageInputProps {
    familyId: string;
    from: MessageUser;
    to: MessageUser;
}

const ChatMessageInput: React.FC<ChatMessageInputProps> = ({ familyId, from, to }) => {
    const { formState, errors, register, handleSubmit, reset } = useForm<FormInput>({
        mode: "all",
    });

    const [createMessageMutation, { loading, error }] = useMutation<CreateMessageResult>(CREATE_MESSAGE_MUTATION);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    const sendNewMessage = async (text: string) => {
        await createMessageMutation({
            refetchQueries: [
                {
                    query: GET_ALL_CHAT_MESSAGES,
                    variables: {
                        input: {
                            familyId,
                            from: from._id,
                            to: to._id,
                        },
                    }
                }
            ],
            variables: {
                input: {
                    familyId,
                    from: from._id,
                    to: to._id,
                    text,
                },
            },
            awaitRefetchQueries: true,
        });
    }

    const onFormSubmit = async (input: FormInput) => {
        await sendNewMessage(input.text);
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
            {!loading && (
                <StyledChatMessageButton
                    disabled={!formState.isValid}
                    type="submit"
                    onClick={handleSubmit(onFormSubmit)}
                >
                    <IoIosSend className="icon" />
                </StyledChatMessageButton>
            )}
            {loading && <LoadingSpinner small />}
        </StyledChatMessageForm>
    );
};

export default ChatMessageInput;
