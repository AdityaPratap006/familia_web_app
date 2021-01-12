import React, { createContext, useEffect, useContext } from 'react';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../graphql/family/queries';
import { FamilyMember } from '../models/family';
import { IMember } from '../models/member';
import { FamilyContext } from './family.context';

interface IChatContext {
    userList: IMember[];
    membersLoading: boolean;
    membersError?: ApolloError;
    membersCalled: boolean;
}

export const ChatContext = createContext<IChatContext>({
    userList: [],
    membersLoading: false,
    membersError: undefined,
    membersCalled: false,
});

export const ChatProvider: React.FC = ({ children }) => {
    const { currentFamily } = useContext(FamilyContext);

    const [fetchMembers, {
        loading: membersLoading,
        error: membersError,
        data: membersData,
        called: membersCalled,
    }] = useLazyQuery<{ getMembersOfAFamily: FamilyMember[] }>(GET_MEMBERS_OF_A_FAMILY_QUERY);

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
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

