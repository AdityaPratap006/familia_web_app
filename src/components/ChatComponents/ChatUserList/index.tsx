import React, { useContext } from 'react';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import ChatUserCard from '../ChatUserCard';
import { StyledChatUserList } from './styled';
import { ChatContext } from '../../../contexts/chat.context';
import { FamilyContext } from '../../../contexts/family.context';

const ChatUserList: React.FC = () => {
    const { membersCalled, membersError, membersLoading, userList } = useContext(ChatContext);
    const { profile } = useContext(UserProfileContext);
    const { currentFamily } = useContext(FamilyContext);

    if (membersError) {
        toast.error(membersError.message);
        return null;
    }


    if (!currentFamily || !profile || (membersCalled && membersLoading) || !userList || membersLoading) {
        return <LoadingSpinner small />;
    }

    const renderUserCards = () => {
        const users = userList.filter(user => user._id !== profile._id);

        return users.map(user => (
            <ChatUserCard
                key={user._id}
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
