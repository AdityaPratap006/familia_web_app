import React, { useContext, useState } from 'react';
import { RiUserAddFill } from 'react-icons/ri';
import { FamilyContext } from '../../../contexts/family.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import SearchUserModal from '../SearchUserModal';
import { StyledCard, StyledIconContainer, StyledText } from './style';

const AddMemberCard: React.FC = () => {
    const { profile } = useContext(UserProfileContext);
    const { currentFamily } = useContext(FamilyContext);
    const [showSearchUserModal, setShowSearchUserModal] = useState(false);

    if (!profile || !currentFamily) {
        return null;
    }

    if (profile._id !== currentFamily.creator._id) {
        return null;
    }

    const openSearchUserModal = () => {
        setShowSearchUserModal(true);
    }

    const closeSearchUserModal = () => {
        setShowSearchUserModal(false);
    }

    return (
        <>
            <SearchUserModal
                show={showSearchUserModal}
                closeModal={closeSearchUserModal}
            />
            <StyledCard onClick={openSearchUserModal}>
                <StyledIconContainer>
                    <RiUserAddFill className="icon" />
                </StyledIconContainer>
                <StyledText>
                    Add Member
                </StyledText>
            </StyledCard>
        </>
    );
};

export default AddMemberCard;
