import React from 'react';
import { FamilyMember } from '../../../models/family';
import Avatar from '../../Avatar';
import Button from '../../Button';
import Card from '../../Card';
import { AvatarContainer, StyledBody, StyledAbout, StyledContent, StyledName, StyledActionContainer, StyledEmail } from './style';

interface InviteMemberCardProps {
    user: FamilyMember;
}

const InviteMemberCard: React.FC<InviteMemberCardProps> = ({ user }) => {
    return (
        <Card>
            <StyledBody>
                <AvatarContainer>
                    <Avatar alt={user.name} src={user.image.url} />
                </AvatarContainer>
                <StyledContent>
                    <StyledName>
                        {user.name}
                    </StyledName>
                    <StyledEmail>
                        {user.email}
                    </StyledEmail>
                    <StyledAbout>
                        {user.about}
                    </StyledAbout>
                    <StyledActionContainer>
                        <Button
                            type="button"
                            size="small"
                        >
                            SEND INVITE
                        </Button>
                    </StyledActionContainer>
                </StyledContent>
            </StyledBody>
        </Card>
    );
};

export default InviteMemberCard;
