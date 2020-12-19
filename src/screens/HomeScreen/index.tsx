import React, { useContext, useEffect, useState } from 'react';
import { HomeScreenContent } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { FamilyContext } from '../../contexts/family.context';
import LoadingSpinner from '../../components/LoadingSpinner';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import AddMemberCard from '../../components/Onboarding/AddMemberCard';
import { ScreenSize } from '../../utils/screenSizes';

const HomeScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(max-width: ${ScreenSize.SM_MAX})`);

        const handleMediaQueryChange = (matches: boolean) => {
            if (matches) {
                setIsMobileScreen(true);
            } else {
                setIsMobileScreen(false);
            }
        }

        handleMediaQueryChange(mediaQueryList.matches);
        mediaQueryList.addEventListener("change", (event) => {
            handleMediaQueryChange(event.matches);
        });
        
    }, []);

    if (!loadingFamilies && families.length === 0) {
        return (
            <Screen
                title="Home"
            >
                <CreateFamilyOnboarder />
            </Screen>
        );
    }

    return (
        <Screen
            title="Home"
            subTitle={currentFamily?.name}
            rightComponent={<CurrentFamilyIndicator />}
        >
            <HomeScreenContent>
                {isMobileScreen && (
                    <AddMemberCard />
                )}
                {!loadingFamilies && <h1>Family Posts!</h1>}
                {loadingFamilies && <LoadingSpinner />}
            </HomeScreenContent>
        </Screen>
    );
};

export default HomeScreen;
