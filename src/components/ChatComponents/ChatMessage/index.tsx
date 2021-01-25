import React, { useContext, useEffect, useRef } from 'react';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { MessageUser } from '../../../models/message';
import { getLocalDateText } from '../../../utils/dates';
import Avatar from '../../Avatar';
import ChatMessageMenu from '../ChatMessageMenu';
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

    useEffect(() => {
        chatMessageRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, []);


    if (!profile) {
        return null;
    }

    const isSent = profile._id === fromUser._id;
    const messageDate = getLocalDateText(date);
    const messageTime = messageDate.split(',').slice(3, 4).join('');
    return (
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
                    {isSent && <ChatMessageMenu />}
                </StyledMessageHeader>
                <StyledMessageText className={`${isSent && 'sent'}`}>{messageText}</StyledMessageText>
            </StyledMessageCard>
        </StyledMessageContainer>
    );
};

export default ChatMessage;
