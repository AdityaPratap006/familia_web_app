import React, { useContext, useEffect } from 'react';
import { FamilyContext } from '../../contexts/family.context';
import Screen from '../../components/ScreenComponents/Screen';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { LocateScreenContent } from './style';
import CustomMap from '../../components/LocateComponents/CustomMap';

const LocateScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);

    useEffect(() => {
        document.title = `Locate | Familia`;
    }, []);

    if (!loadingFamilies && families.length === 0) {
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