import React, { useContext, useEffect } from 'react';
import { FamilyContext } from '../../contexts/family.context';
import Screen from '../../components/ScreenComponents/Screen';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { LocateScreenContent } from './style';
import CustomMap from '../../components/LocateComponents/CustomMap';
import SomethingWentWrongCard from '../../components/Onboarding/SomethingWentWrongCard';

const LocateScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families, errorWhileFetchingFamilies } = useContext(FamilyContext);

    useEffect(() => {
        document.title = `Locate | Familia`;
    }, []);

    if (errorWhileFetchingFamilies) {
        return (
            <Screen
                title="Locate"
            >
                <SomethingWentWrongCard />
            </Screen>
        );
    }

    if (!loadingFamilies && !errorWhileFetchingFamilies && families.length === 0) {
        return (
            <Screen
                title="Locate"
            >
                <CreateFamilyOnboarder />
            </Screen>
        );
    }

    return (
        <Screen
            title="Locate"
            subTitle={currentFamily?.name}
            rightComponent={<CurrentFamilyIndicator />}
        >
            <LocateScreenContent>
                <CustomMap />
            </LocateScreenContent>
        </Screen>
    );
};

export default LocateScreen;