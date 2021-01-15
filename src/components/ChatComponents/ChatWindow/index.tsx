import React, { useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ChatContext } from '../../../contexts/chat.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import LoadingSpinner from '../../LoadingSpinner';
import { ChatWindowContainer, ChatWindowHeader, ChatWindowBody, ChatWindowFooter, GoBackButton, ChatHeaderTitle, ChatHeaderContent, StyledGroupDate, StyledGroup } from './style';
import Avatar from '../../Avatar';
import ChatMessage from '../ChatMessage';
import { GET_ALL_CHAT_MESSAGES } from '../../../graphql/message/queries';
import { IMessage } from '../../../models/message';
import { FamilyContext } from '../../../contexts/family.context';
import { getLocalDateText } from '../../../utils/dates';
import { ON_MESSAGE_ADDED_SUBSCRIPTION } from '../../../graphql/message/subscriptions';

interface IAllChatMessages {
    allChatMessages: IMessage[];
}

interface MessageAddedResult {
    onMessageAdded: IMessage;
}

interface AllChatMessagesInput {
    familyId: string;
    from: string;
    to: string;
}

interface MessageGroups {
    group: {
        date: string;
        messages: IMessage[];
    };
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

    const { subscribeToMore: subscribeToMoreMessages } = chatMessages;
    useEffect(() => {
        if (currentFamily && profile && otherUser && subscribeToMoreMessages) {
            subscribeToMoreMessages<MessageAddedResult>({
                document: ON_MESSAGE_ADDED_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    const existingMessages = prev.allChatMessages;
                    const newMessage = subscriptionData.data.onMessageAdded;

                    return {
                        allChatMessages: [newMessage, ...existingMessages],
                    };
                },
                variables: {
                    input: {
                        familyId: currentFamily._id,
                        from: profile._id,
                        to: otherUser._id,
                    } as AllChatMessagesInput,
                }
            });
        }
    }, [currentFamily, profile, otherUser, subscribeToMoreMessages]);

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

        const messageMap = new Map<string, IMessage[]>();

        messages.forEach(message => {
            const messageDate = getLocalDateText(message.createdAt).split(',').slice(0, 3).join();

            if (messageMap.has(messageDate)) {
                const group = messageMap.get(messageDate) || [];
                group.push(message);
                messageMap.set(messageDate, group);
            } else {
                const group = [message];
                messageMap.set(messageDate, group);
            }
        });

        const messageGroups: MessageGroups[] = [];

        messageMap.forEach((messages, dateString) => {

            messageGroups.push({
                group: {
                    date: dateString,
                    messages,
                }
            });
        });

        return messageGroups.map(({ group: { date, messages } }) => {

            return (
                <StyledGroup key={date}>
                    <StyledGroupDate>{date}</StyledGroupDate>
                    {
                        messages.map((message) => (
                            <ChatMessage
                                key={message._id}
                                fromUser={message.from}
                                toUser={message.to}
                                messageText={message.text}
                                date={message.createdAt}
                            />
                        ))
                    }
                </StyledGroup>
            );
        });
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
