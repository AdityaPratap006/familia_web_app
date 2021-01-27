import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { ChatContext } from '../../../contexts/chat.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import LoadingSpinner from '../../LoadingSpinner';
import { ChatWindowContainer, ChatWindowHeader, ChatWindowBody, ChatWindowFooter, GoBackButton, ChatHeaderTitle, ChatHeaderContent, StyledGroupDate, StyledGroup, ChatWindowMessagesContainer } from './style';
import Avatar from '../../Avatar';
import ChatMessage from '../ChatMessage';
import { GET_ALL_CHAT_MESSAGES } from '../../../graphql/message/queries';
import { IMessage } from '../../../models/message';
import { FamilyContext } from '../../../contexts/family.context';
import { getLocalDateText } from '../../../utils/dates';
import { ON_MESSAGE_ADDED_SUBSCRIPTION, ON_MESSAGE_DELETED_SUBSCRIPTION } from '../../../graphql/message/subscriptions';
import ChatMessageInput from '../ChatMessageInput';
import StartVideoCallButton from '../../VideoCallComponents/StartVideoCallButton';

interface IAllChatMessages {
    allChatMessages: IMessage[];
    totalChatMessages: number;
}

interface MessageAddedResult {
    onMessageAdded: IMessage;
}

interface MessageDeletedResult {
    onMessageDeleted: IMessage;
}

interface AllChatMessagesInput {
    input: {
        familyId: string;
        from: string;
        to: string;
        skip?: number;
    };
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
    const [fetchChatMessages, chatMessages] = useLazyQuery<IAllChatMessages, AllChatMessagesInput>(GET_ALL_CHAT_MESSAGES);
    const [loadingChat, setLoadingChat] = useState(false);
    const [reachedTop, setReachedTop] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const chatWindowBodyRef = useRef<HTMLDivElement>(null);
    const chatWindowMessagesContainerRef = useRef<HTMLDivElement>(null);
    const shouldScrollToLatest = useRef(true);

    const { roomId } = browserParams;
    const otherUserId = roomId;
    const otherUser = userList.find(user => user._id === otherUserId);

    useEffect(() => {
        if (profile && roomId === profile._id) {
            browserHistory.goBack();
        }
    }, [profile, roomId, browserHistory]);

    useEffect(() => {
        setLoadingChat(true);
        setCurrentMessages([]);
        setHasMore(true);
        setReachedTop(false);
        shouldScrollToLatest.current = true;
    }, [roomId, setCurrentMessages]);

    const { refetch: refetchChatMessages } = chatMessages;
    useEffect(() => {
        if (currentFamily && profile && otherUser) {
            if (refetchChatMessages) {
                refetchChatMessages({
                    input: {
                        familyId: currentFamily._id,
                        from: profile._id,
                        to: otherUser._id,
                    }
                });
            } else {
                fetchChatMessages({
                    variables: {
                        input: {
                            familyId: currentFamily._id,
                            from: profile._id,
                            to: otherUser._id,
                        },
                    },
                });
            }
        }

    }, [currentFamily, profile, otherUser, fetchChatMessages, refetchChatMessages]);

    useEffect(() => {
        if (chatMessages.error) {
            toast.error(chatMessages.error.message);
        }
    }, [chatMessages.error]);

    useEffect(() => {
        if (chatMessages.data) {
            setLoadingChat(false);
            const messages = [...chatMessages.data.allChatMessages].reverse();
            setCurrentMessages(messages);
        }
    }, [chatMessages.data, setCurrentMessages]);


    useEffect(() => {

        if (currentFamily && profile && otherUser && chatMessages && chatMessages.subscribeToMore) {
            const unsubscribeMessageAdded = chatMessages.subscribeToMore<MessageAddedResult>({
                document: ON_MESSAGE_ADDED_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    const existingMessages = prev.allChatMessages;
                    const newMessage = subscriptionData.data.onMessageAdded;

                    setReachedTop(false);
                    setHasMore(true);
                    shouldScrollToLatest.current = true;

                    return {
                        allChatMessages: [newMessage, ...existingMessages],
                        totalChatMessages: prev.totalChatMessages + 1
                    };
                },
                variables: {
                    input: {
                        familyId: currentFamily._id,
                        from: profile._id,
                        to: otherUser._id,
                    },
                }
            });

            const unsubscribeMessageDeleted = chatMessages.subscribeToMore<MessageDeletedResult>({
                document: ON_MESSAGE_DELETED_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    const existingMessages = prev.allChatMessages;
                    const deletedMessage = subscriptionData.data.onMessageDeleted;

                    setReachedTop(false);
                    setHasMore(true);
                    shouldScrollToLatest.current = false;
                    setTimeout(() => {
                        shouldScrollToLatest.current = true;
                    }, 1000);

                    return {
                        allChatMessages: existingMessages.filter(message => message._id !== deletedMessage._id),
                        totalChatMessages: prev.totalChatMessages - 1
                    };
                },
                variables: {
                    input: {
                        familyId: currentFamily._id,
                        from: profile._id,
                        to: otherUser._id,
                    },
                }
            });

            return () => {
                unsubscribeMessageAdded();
                unsubscribeMessageDeleted();
            }
        }

    }, [currentFamily, profile, otherUser, chatMessages]);


    useEffect(() => {
        const chatWindowBodyElem = chatWindowBodyRef.current;

        const scrollHandler = () => {
            console.log(`scrolling`);
            if (!chatWindowBodyRef.current || !chatWindowMessagesContainerRef.current) {
                return;
            }

            if (!hasMore) {
                setReachedTop(false);
                return;
            }

            if (hasMore && (chatWindowMessagesContainerRef.current.getBoundingClientRect().top >= chatWindowBodyRef.current.getBoundingClientRect().top)) {
                setReachedTop(true);
            }

        };

        const scrollHandlerDebounced = _.debounce(scrollHandler, 500, {
            maxWait: 0,
        });


        if (chatWindowBodyElem) {
            chatWindowBodyElem.addEventListener('scroll', scrollHandlerDebounced);

            return () => {
                chatWindowBodyElem.removeEventListener('scroll', scrollHandlerDebounced);
            }
        }
    });

    const { fetchMore: fetchMoreChatMessages } = chatMessages;
    useEffect(() => {

        const loadMoreMessages = async () => {
            if (!hasMore || !fetchMoreChatMessages) {
                return;
            }

            if (!currentFamily || !profile || !otherUser) {
                return;
            }

            console.log(`fetch more messages`);
            try {
                await fetchMoreChatMessages({
                    variables: {
                        input: {
                            familyId: currentFamily._id,
                            from: profile._id,
                            to: otherUser._id,
                            skip: chatMessages.data?.allChatMessages.length,
                        },
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                            return prev;
                        }

                        let combined: IMessage[] = prev.allChatMessages ? [...prev.allChatMessages] : [];

                        fetchMoreResult.allChatMessages.forEach(msg => {
                            const alreadyExists = prev.allChatMessages.some(prevMsg => prevMsg._id === msg._id);
                            if (!alreadyExists) {
                                combined.push(msg);
                            }
                        });

                        const newData: IAllChatMessages = {
                            allChatMessages: combined,
                            totalChatMessages: fetchMoreResult.totalChatMessages,
                        };

                        if (newData.allChatMessages.length === fetchMoreResult.totalChatMessages) {
                            setHasMore(false);
                        }

                        return newData;
                    },
                });
            } catch (error) {
                toast.error(error.message);
            } finally {
                setReachedTop(false);
            }
        };

        if (reachedTop && hasMore) {

            loadMoreMessages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        reachedTop, hasMore,
        currentFamily, otherUser, profile,
        fetchMoreChatMessages,
    ]);

    useEffect(() => {
        console.log(`reached Top: `, reachedTop);
    }, [reachedTop]);

    if (!profile || !otherUser || !currentFamily) {
        return (
            <ChatWindowContainer>
                <LoadingSpinner />
            </ChatWindowContainer>
        );
    }

    const renderChatMessages = () => {
        const { data, loading } = chatMessages;

        if (loading || loadingChat) {
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
                        messageId={message._id}
                        fromUser={message.from}
                        toUser={message.to}
                        messageText={message.text}
                        date={message.createdAt}
                        hasOptimisticUI={message.optimisticUI}
                        isLatestMessage={shouldScrollToLatest.current && message._id === currentMessages[currentMessages.length - 1]?._id}
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
                <StartVideoCallButton toUser={otherUser} />
            </ChatWindowHeader>
            <ChatWindowBody ref={chatWindowBodyRef}>
                {!chatMessages.error && !chatMessages.loading && hasMore && reachedTop && <LoadingSpinner />}
                <ChatWindowMessagesContainer ref={chatWindowMessagesContainerRef}>
                    {renderChatMessages()}
                </ChatWindowMessagesContainer>
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
