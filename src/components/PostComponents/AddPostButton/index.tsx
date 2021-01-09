import React, { useState } from 'react';
import { RiHeartAddFill } from 'react-icons/ri';
import AddPostModal from '../AddPostModal';
import { AddPostButtonText, StyledAddPostButton } from './style';

const AddPostButton: React.FC = () => {
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    const openAddPostModal = () => {
        setShowAddPostModal(true);
    }

    const closeAddPostModal = () => {
        setShowAddPostModal(false);
    }

    return (
        <React.Fragment>
            <AddPostModal
                show={showAddPostModal}
                onCancel={closeAddPostModal}
            />
            <StyledAddPostButton type='button' onClick={openAddPostModal}>
                <RiHeartAddFill className='icon' />
                <AddPostButtonText>Share A Post</AddPostButtonText>
            </StyledAddPostButton>
        </React.Fragment>
    );
};

export default AddPostButton;
