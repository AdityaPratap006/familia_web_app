import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { IMember } from '../../../models/member';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import Avatar from '../../Avatar';
import Card from '../../Card';
import { ChatUserCardAvatarContainer, ChatUserCardContent, ChatUserCardName, ChatUserCardContainer, ChatUserCardCSS } from './style';

interface ChatUserCardProps {
    member: IMember;
}

const ChatUserCard: React.FC<ChatUserCardProps> = ({ member }) => {
    const { profile } = useContext(UserProfileContext);

    if (!profile) {
        return null;
    }

    const you: IMember = {
        _id: profile._id,
        about: profile.about,
        email: profile.email,
        name: profile.name,
        image: {
            url: profile.image.url,
        }
    };
    const other = member;
    const roomId = `${other._id}`;

    return (
        <Link
            to={you._id !== other._id ? `${NavigationRoutes.CHATS}/${roomId}` : `${NavigationRoutes.CHATS}`}
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
