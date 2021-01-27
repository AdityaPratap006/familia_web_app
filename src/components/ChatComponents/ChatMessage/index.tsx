import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { IMessage, MessageUser } from '../../../models/message';
import { getLocalDateText } from '../../../utils/dates';
import Avatar from '../../Avatar';
import ChatMessageMenu from '../ChatMessageMenu';
import DeleteMessageModal from '../DeleteMessageModal';
import { StyledMessageAvatarContainer, StyledMessageCard, StyledMessageContainer, StyledMessageTime, StyledMessageText, StyledMessageHeader } from './style';
import { DELETE_MESSAGE_MUTATION } from '../../../graphql/message/mutations';

interface ChatMessageProps {
    fromUser: MessageUser;
    toUser: MessageUser;
    messageText: string;
    date: string;
    hasOptimisticUI?: boolean;
    messageId: string;
    isLatestMessage?: boolean;
}

interface DeleteMessageResponse {
    deleteMessage: IMessage;
}

interface DeleteMessageInput {
    input: {
        messageId: string;
    }
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isLatestMessage, fromUser, messageText, date, hasOptimisticUI, messageId }) => {
    const { profile } = useContext(UserProfileContext);
    const chatMessageRef = useRef<HTMLDivElement>(null);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteMessage, deleteMessageResponse] = useMutation<DeleteMessageResponse, DeleteMessageInput>(DELETE_MESSAGE_MUTATION);

    useEffect(() => {
        if (isLatestMessage) {
            chatMessageRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [isLatestMessage]);


    const showDeleteWarningHandler = () => {
        setShowDeleteWarning(true);
    };

    const cancelDeleteWarningHandler = () => {
        setShowDeleteWarning(false);
    }

    const confirmDeleteHandler = async () => {
        try {
            const { data, errors } = await deleteMessage({
                variables: {
                    input: {
                        messageId,
                    },
                }
            })

            if (errors) {
                toast.error(errors[0]?.message);
            }

            if (data) {
                toast.success(`Message deleted!`);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setShowDeleteWarning(false);
        }
    }

    if (!profile) {
        return null;
    }

    const isSent = profile._id === fromUser._id;
    const messageDate = getLocalDateText(date);
    const messageTime = messageDate.split(',').slice(3, 4).join('');
    return (
        <React.Fragment>
            <DeleteMessageModal
                show={showDeleteWarning}
                onCancel={cancelDeleteWarningHandler}
                onConfirm={confirmDeleteHandler}
                deleteReponseLoading={deleteMessageResponse.loading}
            />
            <StyledMessageContainer
                ref={chatMessageRef}
                className={`
                ${isSent && 'sent'} 
                ${hasOptimisticUI && 'optimistic'}
            `}
            >
                <StyledMessageAvatarContainer>
                    <Avatar
                        tiny
                        alt={'DP'}
                        src={fromUser.image.url}
                    />
                </StyledMessageAvatarContainer>
                <StyledMessageCard className={`${isSent && 'sent'}`}>
                    <StyledMessageHeader>
                        <StyledMessageTime className={`${isSent && 'sent'}`}>{messageTime}</StyledMessageTime>
                        {isSent && <ChatMessageMenu onDeleteRequest={showDeleteWarningHandler} />}
                    </StyledMessageHeader>
                    <StyledMessageText className={`${isSent && 'sent'}`}>{messageText}</StyledMessageText>
                </StyledMessageCard>
            </StyledMessageContainer>
        </React.Fragment>
    );
};

export default ChatMessage;
