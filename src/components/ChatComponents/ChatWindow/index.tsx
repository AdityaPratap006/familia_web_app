import React, { useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { ChatContext } from '../../../contexts/chat.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import LoadingSpinner from '../../LoadingSpinner';
import { ChatWindowContainer, ChatWindowHeader, ChatWindowBody, ChatWindowFooter, GoBackButton, ChatHeaderTitle, ChatHeaderContent } from './style';
import Avatar from '../../Avatar';
import { IMember } from '../../../models/member';
import ChatMessage from '../ChatMessage';

const ChatWindow: React.FC = () => {
    const { userList } = useContext(ChatContext);
    const { profile } = useContext(UserProfileContext);
    const browserParams = useParams<{ roomId: string }>();
    const browserHistory = useHistory();

    const { roomId } = browserParams;
    const otherUserId = roomId;
    const otherUser = userList.find(user => user._id === otherUserId);

    useEffect(() => {
        if (profile && roomId === profile._id) {
            browserHistory.goBack();
        }
    }, [profile, roomId, browserHistory]);

    if (!profile || !otherUser) {
        return (
            <ChatWindowContainer>
                <LoadingSpinner />
            </ChatWindowContainer>
        );
    }

    const renderChatMessages = () => {
        const messages: { from: IMember, to: IMember, text: string }[] = [
            {
                from: profile,
                to: otherUser,
                text: 'Hello!'
            },
            {
                from: otherUser,
                to: profile,
                text: 'Hey! How are you?'
            },
            {
                from: profile,
                to: otherUser,
                text: 'Doing good! what about you?'
            },
            {
                from: otherUser,
                to: profile,
                text: 'Doing great, thanks :)'
            }
        ];

        return messages.map((message, index) => (
            <ChatMessage
                key={index}
                fromUser={message.from}
                toUser={message.to}
                messageText={message.text}
            />
        ));
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
                {renderChatMessages()}
                {renderChatMessages()}
            </ChatWindowBody>
            <ChatWindowFooter>

            </ChatWindowFooter>
        </ChatWindowContainer>
    );
};

export default ChatWindow;
