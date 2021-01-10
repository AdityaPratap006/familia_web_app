import React, { useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FamilyContext } from '../../../contexts/family.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import Button from '../../Button';
import Card from '../../Card';
import { OnboardingAddMemberCardCSS, StyledTitle } from './style';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../../../graphql/family/queries';
import { IMember } from '../../../models/member';

interface MembersQueryResult {
    getMembersOfAFamily: IMember[];
}

const OnboardingAddMemberCard: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const { profile } = useContext(UserProfileContext);
    const [fetchMemebers, { loading, data }] = useLazyQuery<MembersQueryResult>(GET_MEMBERS_OF_A_FAMILY_QUERY);

    useEffect(() => {
        if (currentFamily) {
            fetchMemebers({
                variables: {
                    input: { familyId: currentFamily._id },
                },
            });
        }   
    }, [currentFamily, fetchMemebers]);

    if (!currentFamily || !profile) {
        return null;
    }

    if (loading) {
        return null;
    }

    if (data && data.getMembersOfAFamily.length > 1) {
        return null;
    }

    if (profile._id !== currentFamily.creator._id) {
        return null;
    }

    return (
        <Card addcss={OnboardingAddMemberCardCSS}>
            <StyledTitle>
                You are all alone here, invite your loved ones to join {currentFamily.name}.
            </StyledTitle>
            <Button inverse to={`${NavigationRoutes.MEMORIES}`}>
                Invite Members
            </Button>
        </Card>
    );
};

export default OnboardingAddMemberCard;
