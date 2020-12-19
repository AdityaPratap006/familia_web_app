import React, { useContext } from 'react';
import { FamilyContext } from '../../contexts/family.context';
import Screen from '../../components/ScreenComponents/Screen';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { MembersGrid, MemoriesScreenContent, Section, SectionTitle } from './style';
import MemberCard from '../../components/FamilyMemberComponents/MemberCard';
import AddMemberCard from '../../components/FamilyMemberComponents/AddMemberCard';
// import LoadingSpinner from '../../components/LoadingSpinner';

const MemoriesScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);

    if (!loadingFamilies && families.length === 0) {
        return (
            <Screen
                title="Memories"
            >
                <CreateFamilyOnboarder />
            </Screen>
        );
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
                    <MembersGrid>
                        {currentFamily && <MemberCard user={currentFamily.creator} />}
                        {currentFamily && <MemberCard user={currentFamily.creator} />}
                        {currentFamily && <MemberCard user={currentFamily.creator} />}
                        <AddMemberCard />
                    </MembersGrid>
                </Section>
            </MemoriesScreenContent>
        </Screen>
    );
};

export default MemoriesScreen;
