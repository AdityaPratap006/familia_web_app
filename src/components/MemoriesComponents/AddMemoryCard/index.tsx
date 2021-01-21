import React, { useState } from 'react';
import { RiHeartAddFill } from 'react-icons/ri';
import AddMemoryModal from '../AddMemoryModal';
import { StyledCard, StyledIconContainer, StyledText } from './style';

const AddMemoriesCard: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModalHandler = () => {
        setModalOpen(true);
    }

    const closeModalHandler = () => {
        setModalOpen(false);
    }

    return (
        <React.Fragment>
            <AddMemoryModal
                show={modalOpen}
                closeModal={closeModalHandler}
            />
            <StyledCard onClick={openModalHandler}>
                <StyledIconContainer>
                    <RiHeartAddFill className="icon" />
                </StyledIconContainer>
                <StyledText>
                    Add Memory
                </StyledText>
            </StyledCard>
        </React.Fragment>
    );
};

export default AddMemoriesCard;
