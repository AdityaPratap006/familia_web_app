import React, { useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ChatContext } from '../../../contexts/chat.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import LoadingSpinner from '../../LoadingSpinner';
import { ChatWindowContainer, ChatWindowHeader, ChatWindowBody, ChatWindowFooter, GoBackButton, ChatHeaderTitle, ChatHeaderContent } from './style';
import Avatar from '../../Avatar';
import ChatMessage from '../ChatMessage';
import { GET_ALL_CHAT_MESSAGES } from '../../../graphql/message/queries';
import { IMessage } from '../../../models/message';
import { FamilyContext } from '../../../contexts/family.context';

interface IAllChatMessages {
    allChatMessages: IMessage[];
}

interface AllChatMessagesInput {
    familyId: string;
    from: string;
    to: string;
}

const ChatWindow: React.FC = () => {
    const { userList } = useContext(ChatContext);
    const { profile } = useContext(UserProfileContext);
    const { currentFamily } = useContext(FamilyContext);
    const browserParams = useParams<{ roomId: string }>();
    const browserHistory = useHistory();
    const [fetchChatMessages, chatMessages] = useLazyQuery<IAllChatMessages>(GET_ALL_CHAT_MESSAGES);

    const { roomId } = browserParams;
    const otherUserId = roomId;
    const otherUser = userList.find(user => user._id === otherUserId);

    useEffect(() => {
        if (profile && roomId === profile._id) {
            browserHistory.goBack();
        }
    }, [profile, roomId, browserHistory]);

    useEffect(() => {
        if (currentFamily && profile && otherUser) {
            fetchChatMessages({
                variables: {
                    input: {
                        familyId: currentFamily._id,
                        from: profile._id,
                        to: otherUser._id,
                    } as AllChatMessagesInput,
                }
            });
        }

    }, [currentFamily, profile, otherUser, fetchChatMessages]);

    useEffect(() => {
        if (chatMessages.error) {
            toast.error(chatMessages.error.message);
        }
    }, [chatMessages.error]);

    if (!profile || !otherUser) {
        return (
            <ChatWindowContainer>
                <LoadingSpinner />
            </ChatWindowContainer>
        );
    }

    const renderChatMessages = () => {
        const { data, loading } = chatMessages;

        if (loading) {
            return <LoadingSpinner />;
        }

        if (!data) {
            return null;
        }

        const messages: IMessage[] = data.allChatMessages;

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
            </ChatWindowBody>
            <ChatWindowFooter>

            </ChatWindowFooter>
        </ChatWindowContainer>
    );
};

export default ChatWindow;
