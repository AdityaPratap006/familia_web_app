import React, { useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { FamilyContext } from '../../../contexts/family.context';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../../../graphql/family/queries';
import { FamilyMember } from '../../../models/family';
import Card from '../../Card';
import LoadingBouncers from '../../LoadingBouncers';
import { StyledMemberList, MemberListContainerCSS, StyledMemberListTitle, WarningMessage, StyledMemberCard, StyledMemberCardAvatarContainer, StyledMemberCardContent, MemberName, MemberEmail } from './style';
import Avatar from '../../Avatar';
import { UserProfileContext } from '../../../contexts/userProfile.context';

const HomeMemberList: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const [fetchMembers, { loading, called, error, data }] = useLazyQuery<{ getMembersOfAFamily: FamilyMember[] }>(GET_MEMBERS_OF_A_FAMILY_QUERY);

    useEffect(() => {
        if (currentFamily) {
            fetchMembers({
                variables: {
                    input: { familyId: currentFamily._id },
                },
            });
        }

    }, [currentFamily, fetchMembers]);

    if (!currentFamily) {
        return <LoadingBouncers />;
    }

    if (error) {
        toast.error(error.message);
    }

    const renderMemberCards = () => {
        if (!data) {
            return null;
        }

        const members = data.getMembersOfAFamily;

        return members.map(member => (
            <HomeMemberCard key={member._id} member={member} />
        ));
    }

    return (
        <Card addcss={MemberListContainerCSS}>
            <StyledMemberListTitle>Members of "{currentFamily.name}"</StyledMemberListTitle>
            <StyledMemberList>
                {called && loading && <LoadingBouncers medium />}
                {called && !loading && !data &&
                    <WarningMessage>No members</WarningMessage>
                }
                {renderMemberCards()}
            </StyledMemberList>
        </Card>
    );
};

export default HomeMemberList;

interface HomeMemberCardProps {
    member: FamilyMember;
}

const HomeMemberCard: React.FC<HomeMemberCardProps> = ({ member }) => {
    const { profile } = useContext(UserProfileContext);

    if (!profile) {
        return null;
    }

    return (
        <StyledMemberCard>
            <StyledMemberCardAvatarContainer>
                <Avatar alt={`profile pic`} src={member.image.url} small />
            </StyledMemberCardAvatarContainer>
            <StyledMemberCardContent>
                <MemberName>{member.name} {member._id === profile._id && ` (You)`}</MemberName>
                <MemberEmail>{member.email}</MemberEmail>
            </StyledMemberCardContent>
        </StyledMemberCard>
    );
} 
