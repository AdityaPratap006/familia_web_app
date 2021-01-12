import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { ChatContext } from '../../../contexts/chat.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import LoadingSpinner from '../../LoadingSpinner';
import { ChatWindowContainer, ChatWindowHeader, ChatWindowBody, ChatWindowFooter, GoBackButton, ChatHeaderTitle, ChatHeaderContent } from './style';
import Avatar from '../../Avatar';

const ChatWindow: React.FC = () => {
    const { userList } = useContext(ChatContext);
    const { profile } = useContext(UserProfileContext);
    const browserParams = useParams<{ roomId: string }>();

    const { roomId } = browserParams;
    const otherUserId = roomId;
    const otherUser = userList.find(user => user._id === otherUserId);

    if (!profile || !otherUser) {
        return (
            <ChatWindowContainer>
                <LoadingSpinner />
            </ChatWindowContainer>
        );
    }

    return (
        <ChatWindowContainer>
            <ChatWindowHeader>
                <Link to={`${NavigationRoutes.CHATS}`} >
                    <GoBackButton >
                        <MdArrowBack className="icon" />
                    </GoBackButton>
                </Link>
                <ChatHeaderContent>
                    <Avatar alt={otherUser.name} src={otherUser.image.url} />
                    <ChatHeaderTitle >{otherUser.name}</ChatHeaderTitle>
                </ChatHeaderContent>
            </ChatWindowHeader>
            <ChatWindowBody>

            </ChatWindowBody>
            <ChatWindowFooter>

            </ChatWindowFooter>
        </ChatWindowContainer>
    );
};

export default ChatWindow;
