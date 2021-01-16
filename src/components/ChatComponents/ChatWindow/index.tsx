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
import ChatMessageInput from '../ChatMessageInput';

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

interface MessageGroup {
    group: {
        date: string;
        messages: IMessage[];
    };
}

const ChatWindow: React.FC = () => {
    const { userList, currentMessages, setCurrentMessages } = useContext(ChatContext);
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

    useEffect(() => {
        if (chatMessages.data) {
            setCurrentMessages(chatMessages.data.allChatMessages);
        }
    }, [chatMessages.data, setCurrentMessages]);

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

    if (!profile || !otherUser || !currentFamily) {
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

        const messages: IMessage[] = currentMessages;
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

        const messageGroups: MessageGroup[] = [];

        messageMap.forEach((messages, dateString) => {
            messageGroups.push({
                group: {
                    date: dateString,
                    messages,
                }
            });
        });

        return messageGroups.map(({ group: { date, messages } }) => (
            <StyledGroup key={date}>
                <StyledGroupDate>{date}</StyledGroupDate>
                {messages.map((message) => (
                    <ChatMessage
                        key={message._id}
                        fromUser={message.from}
                        toUser={message.to}
                        messageText={message.text}
                        date={message.createdAt}
                        hasOptimisticUI={message.optimisticUI}
                    />
                ))}
            </StyledGroup>
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
                    <Avatar tiny alt={otherUser.name} src={otherUser.image.url} />
                    <ChatHeaderTitle >{otherUser.name}</ChatHeaderTitle>
                </ChatHeaderContent>
            </ChatWindowHeader>
            <ChatWindowBody>
                {renderChatMessages()}
            </ChatWindowBody>
            <ChatWindowFooter>
                <ChatMessageInput
                    familyId={currentFamily._id}
                    from={profile}
                    to={otherUser}
                />
            </ChatWindowFooter>
        </ChatWindowContainer>
    );
};

export default ChatWindow;
