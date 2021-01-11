import React, { useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FamilyContext } from '../../../contexts/family.context';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../../../graphql/family/queries';
import { FamilyMember } from '../../../models/family';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import ChatUserCard from '../ChatUserCard';
import { StyledChatUserList } from './styled';

const ChatUserList: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const { profile } = useContext(UserProfileContext);
    const [fetchMembers, { loading: membersLoading, error: membersError, data: membersData, called: membersCalled }] = useLazyQuery<{ getMembersOfAFamily: FamilyMember[] }>(GET_MEMBERS_OF_A_FAMILY_QUERY);

    useEffect(() => {
        if (currentFamily) {
            fetchMembers({
                variables: {
                    input: { familyId: currentFamily._id },
                },
            });
        }

    }, [currentFamily, fetchMembers]);

    if (membersError) {
        toast.error(membersError.message);
        return null;
    }


    if (!profile || !currentFamily || (membersCalled && membersLoading) || !membersData || membersLoading) {
        return <LoadingSpinner small />;
    }

    const renderUserCards = () => {
        const users = membersData.getMembersOfAFamily.filter(user => user._id !== profile._id);

        return users.map(user => (
            <ChatUserCard
                member={user}
            />
        ));
    }

    return (
        <StyledChatUserList>
            {renderUserCards()}
        </StyledChatUserList>
    );
};

export default ChatUserList;
