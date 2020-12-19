import React from 'react';
import { FamilyMember } from '../../../models/family';
import Avatar from '../../Avatar';
import Card from '../../Card';
import { StyledBody, StyledName } from './style';

interface MemberCardProps {
    user: FamilyMember;
}

const MemberCard: React.FC<MemberCardProps> = ({ user }) => {
    return (
        <Card>
            <StyledBody>
                <StyledName>{user.name}</StyledName>
            </StyledBody>
            <Avatar small alt={user.name} src={user.image.url} />
        </Card>
    );
};

export default MemberCard;
