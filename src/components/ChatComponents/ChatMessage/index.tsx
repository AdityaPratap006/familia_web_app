import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { MessageUser } from '../../../models/message';
import { getLocalDateText } from '../../../utils/dates';
import Avatar from '../../Avatar';
import ChatMessageMenu from '../ChatMessageMenu';
import DeleteMessageModal from '../DeleteMessageModal';
import { StyledMessageAvatarContainer, StyledMessageCard, StyledMessageContainer, StyledMessageTime, StyledMessageText, StyledMessageHeader } from './style';

interface ChatMessageProps {
    fromUser: MessageUser;
    toUser: MessageUser;
    messageText: string;
    date: string;
    hasOptimisticUI?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ fromUser, messageText, date, hasOptimisticUI }) => {
    const { profile } = useContext(UserProfileContext);
    const chatMessageRef = useRef<HTMLDivElement>(null);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    useEffect(() => {
        chatMessageRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, []);


    const showDeleteWarningHandler = () => {
        setShowDeleteWarning(true)
    };

    const cancelDeleteWarningHandler = () => {
        setShowDeleteWarning(false);
    }

    const confirmDeleteHandler = async () => {
        toast.success(`Deleting Message...`);
        setShowDeleteWarning(false);
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
