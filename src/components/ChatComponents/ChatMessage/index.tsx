import React, { useContext, useEffect, useRef } from 'react';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { IMember } from '../../../models/member';
import Avatar from '../../Avatar';
import { StyledMessageAvatarContainer, StyledMessageCard, StyledMessageContainer, StyledMessageText } from './style';

interface ChatMessageProps {
    fromUser: IMember;
    toUser: IMember;
    messageText: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ fromUser, toUser, messageText }) => {
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
            </StyledMessageCard>
        </StyledMessageContainer>
    );
};

export default ChatMessage;
