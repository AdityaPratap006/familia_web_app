import React, { useContext, useEffect, useRef } from 'react';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { MessageUser } from '../../../models/message';
import { getLocalDateText } from '../../../utils/dates';
import Avatar from '../../Avatar';
import { StyledMessageAvatarContainer, StyledMessageCard, StyledMessageContainer, StyledMessageTime, StyledMessageText } from './style';

interface ChatMessageProps {
    fromUser: MessageUser;
    toUser: MessageUser;
    messageText: string;
    date: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ fromUser, messageText, date }) => {
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
        <StyledMessageContainer ref={chatMessageRef} className={`${isSent && 'sent'}`}>
            <StyledMessageAvatarContainer>
                <Avatar
                    tiny
                    alt={'DP'}
                    src={fromUser.image.url}
                />
            </StyledMessageAvatarContainer>
            <StyledMessageCard className={`${isSent && 'sent'}`}>
                <StyledMessageText className={`${isSent && 'sent'}`}>{messageText}</StyledMessageText>
                <StyledMessageTime className={`${isSent && 'sent'}`}>{messageTime}</StyledMessageTime>
            </StyledMessageCard>
        </StyledMessageContainer>
    );
};

export default ChatMessage;
