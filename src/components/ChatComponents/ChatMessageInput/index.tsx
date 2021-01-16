import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { IoIosSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import { ChatContext } from '../../../contexts/chat.context';
import { CREATE_MESSAGE_MUTATION } from '../../../graphql/message/mutations';
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
    const { setCurrentMessages } = useContext(ChatContext);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    const sendNewMessage = async (text: string) => {

        const newMessageOptimistic: IMessage = {
            _id: (1_000_000_000_000 * Math.random()).toLocaleString(),
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
            family: familyId,
            from,
            text,
            to,
            optimisticUI: true,
        };

        setCurrentMessages(prevMessages => [...prevMessages, newMessageOptimistic]);

        const { data } = await createMessageMutation({
            variables: {
                input: {
                    familyId,
                    from: from._id,
                    to: to._id,
                    text,
                },
            },
            optimisticResponse: {
                createMessage: newMessageOptimistic,
            }
        });

        if (data) {
            const newMessage = data.createMessage;

            setCurrentMessages(prevMessages => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (lastMessage.from._id === from._id) {
                    prevMessages.pop();
                }
                return [...prevMessages, newMessage]
            });
        }
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
                    rows={1}
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
