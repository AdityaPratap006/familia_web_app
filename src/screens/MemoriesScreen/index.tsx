import React, { useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FamilyContext } from '../../contexts/family.context';
import Screen from '../../components/ScreenComponents/Screen';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { MembersGrid, MemoriesScreenContent, Section, SectionTitle } from './style';
import MemberCard from '../../components/FamilyMemberComponents/MemberCard';
import AddMemberCard from '../../components/FamilyMemberComponents/AddMemberCard';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../../graphql/family/queries';
import { FamilyMember } from '../../models/family';
import LoadingBouncers from '../../components/LoadingBouncers';
import { toast } from 'react-toastify';
// import LoadingSpinner from '../../components/LoadingSpinner';

const MemoriesScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);
    const [fetchMembers, fetchMembersResult] = useLazyQuery<{ getMembersOfAFamily: FamilyMember[] }>(GET_MEMBERS_OF_A_FAMILY_QUERY);

    useEffect(() => {
        document.title = `Memories | Familia`;
    }, []);

    useEffect(() => {
        if (currentFamily) {
            fetchMembers({
                variables: {
                    input: { familyId: currentFamily._id },
                },
            });
        }

    }, [currentFamily, fetchMembers]);

    if (!loadingFamilies && families.length === 0) {
        return (
            <Screen
                title="Memories"
            >
                <CreateFamilyOnboarder />
            </Screen>
        );
    }

    const renderMembersList = (): React.ReactNode => {

        if (fetchMembersResult.data) {
            const members = fetchMembersResult.data.getMembersOfAFamily;

            return members.map(member => (
                <MemberCard key={member._id} user={member} />
            ));
        }

        if (fetchMembersResult.error) {
            const { error } = fetchMembersResult;
            toast.error(error.message);

            console.log(`Error loading members:`, error);
        }


        return null;
    }

    return (
        <Screen
            title="Memories"
            subTitle={currentFamily?.name}
            rightComponent={<CurrentFamilyIndicator />}
        >
            <MemoriesScreenContent>
                <Section>
                    <SectionTitle>Members</SectionTitle>
                    {!fetchMembersResult.called && (
                        <LoadingBouncers medium />
                    )}
                    {fetchMembersResult.called && fetchMembersResult.loading && (
                        <LoadingBouncers medium />
                    )}
                    {fetchMembersResult.data && (
                        <MembersGrid>
                            {renderMembersList()}
                            <AddMemberCard />
                        </MembersGrid>
                    )}
                </Section>
            </MemoriesScreenContent>
        </Screen>
    );
};

export default MemoriesScreen;
