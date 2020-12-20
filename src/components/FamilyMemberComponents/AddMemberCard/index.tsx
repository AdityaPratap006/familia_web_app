import React, { useState } from 'react';
import { RiUserAddFill } from 'react-icons/ri';
import SearchUserModal from '../SearchUserModal';
import { StyledCard, StyledIconContainer, StyledText } from './style';

const AddMemberCard: React.FC = () => {
    const [showSearchUserModal, setShowSearchUserModal] = useState(false);

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
