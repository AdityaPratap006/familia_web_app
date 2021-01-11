import React from 'react';
import { Link } from 'react-router-dom';
import { IMember } from '../../../models/member';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import Avatar from '../../Avatar';
import Card from '../../Card';
import { ChatUserCardAvatarContainer, ChatUserCardContent, ChatUserCardName, ChatUserCardContainer, ChatUserCardCSS } from './style';

interface ChatUserCardProps {
    member: IMember;
}

const ChatUserCard: React.FC<ChatUserCardProps> = ({ member }) => {
    return (
        <Link
            to={`${NavigationRoutes.CHATS}/room`}
            style={{
                textDecoration: 'none',
            }}
        >
            <ChatUserCardContainer>
                <Card addcss={ChatUserCardCSS}>
                    <ChatUserCardAvatarContainer>
                        <Avatar tiny alt={member.name} src={member.image.url} />
                    </ChatUserCardAvatarContainer>
                    <ChatUserCardContent>
                        <ChatUserCardName>
                            {member.name}
                        </ChatUserCardName>
                    </ChatUserCardContent>
                </Card>
            </ChatUserCardContainer>
        </Link>
    );
};

export default ChatUserCard;
