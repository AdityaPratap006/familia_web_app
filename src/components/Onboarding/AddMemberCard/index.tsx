import React, { useContext } from 'react';
import { FamilyContext } from '../../../contexts/family.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import Button from '../../Button';
import Card from '../../Card';
import { StyledTitle } from './style';

const AddMemberCard: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const { profile } = useContext(UserProfileContext);

    if (!currentFamily || !profile) {
        return null;
    }

    if (currentFamily.memberCount > 1) {
        return null;
    }

    if (profile._id !== currentFamily.creator._id) {
        return null;
    }

    return (
        <Card>
            <StyledTitle>
                You are all alone here, invite your loved ones to join {currentFamily?.name}.
            </StyledTitle>
            <Button inverse>
                Invite Members
            </Button>
        </Card>
    );
};

export default AddMemberCard;
