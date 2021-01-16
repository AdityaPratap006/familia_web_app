import React, { createContext, useEffect, useContext, useState } from 'react';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../graphql/family/queries';
import { FamilyMember } from '../models/family';
import { IMember } from '../models/member';
import { FamilyContext } from './family.context';
import { IMessage } from '../models/message';

interface IChatContext {
    userList: IMember[];
    membersLoading: boolean;
    membersError?: ApolloError;
    membersCalled: boolean;
    currentMessages: IMessage[];
    setCurrentMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

export const ChatContext = createContext<IChatContext>({
    userList: [],
    membersLoading: false,
    membersError: undefined,
    membersCalled: false,
    currentMessages: [],
    setCurrentMessages: () => null,
});

export const ChatProvider: React.FC = ({ children }) => {
    const { currentFamily } = useContext(FamilyContext);

    const [fetchMembers, {
        loading: membersLoading,
        error: membersError,
        data: membersData,
        called: membersCalled,
    }] = useLazyQuery<{ getMembersOfAFamily: FamilyMember[] }>(GET_MEMBERS_OF_A_FAMILY_QUERY);

    const [messageList, setMessageList] = useState<IMessage[]>([]);

    useEffect(() => {
        if (currentFamily) {
            fetchMembers({
                variables: {
                    input: { familyId: currentFamily._id },
                },
            });
        }

    }, [currentFamily, fetchMembers]);

    return (
        <ChatContext.Provider
            value={{
                membersCalled,
                membersLoading,
                membersError,
                userList: (currentFamily && membersData?.getMembersOfAFamily) || [],
                currentMessages: messageList,
                setCurrentMessages: setMessageList,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

