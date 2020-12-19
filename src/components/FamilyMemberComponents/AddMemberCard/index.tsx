import React from 'react';
import { RiUserAddFill } from 'react-icons/ri';
import { StyledCard, StyledIconContainer, StyledText } from './style';

const AddMemberCard: React.FC = () => {
    return (
        <StyledCard>
            <StyledIconContainer>
                <RiUserAddFill className="icon" />
            </StyledIconContainer>
            <StyledText>
                Add Member
            </StyledText>
        </StyledCard>
    );
};

export default AddMemberCard;
