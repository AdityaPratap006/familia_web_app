import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
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
    const routeParams = useParams<{ roomId: string; }>();


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
    const isActive = roomId === routeParams.roomId;
    return (
        <Link
            to={you._id !== other._id ? `${NavigationRoutes.CHATS}/${roomId}` : `${NavigationRoutes.CHATS}`}
            style={{
                textDecoration: 'none',
            }}
        >
            <ChatUserCardContainer className={`${isActive && 'active'}`}>
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
