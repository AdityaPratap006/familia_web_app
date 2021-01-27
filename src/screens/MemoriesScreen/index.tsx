import React, { useContext, useEffect } from 'react';
import { FamilyContext } from '../../contexts/family.context';
import Screen from '../../components/ScreenComponents/Screen';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { MemoriesScreenContent, Section, SectionTitle } from './style';
import MemoriesMemberGrid from '../../components/FamilyMemberComponents/MemoriesMemberGrid';
import MemoriesGrid from '../../components/MemoriesComponents/MemoriesGrid';
import SomethingWentWrongCard from '../../components/Onboarding/SomethingWentWrongCard';

const MemoriesScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families, errorWhileFetchingFamilies } = useContext(FamilyContext);

    useEffect(() => {
        document.title = `Memories | Familia`;
    }, []);

    if (errorWhileFetchingFamilies) {
        return (
            <Screen
                title="Memories"
            >
                <SomethingWentWrongCard />
            </Screen>
        );
    }
    
    if (!loadingFamilies && !errorWhileFetchingFamilies && families.length === 0) {
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
                    <MemoriesMemberGrid />
                </Section>
                <Section>
                    <SectionTitle>Memories</SectionTitle>
                    <MemoriesGrid />
                </Section>
            </MemoriesScreenContent>
        </Screen>
    );
};

export default MemoriesScreen;
