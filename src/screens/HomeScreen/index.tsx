import React, { useContext, useEffect, useRef, useState } from 'react';
import { HomeScreenContent, MemberList, PostFeed, QuotesSection } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { FamilyContext } from '../../contexts/family.context';
import LoadingSpinner from '../../components/LoadingSpinner';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import AddMemberCard from '../../components/Onboarding/OnboardingAddMemberCard';
import { ScreenSize } from '../../utils/screenSizes';
import HomeMemberList from '../../components/FamilyMemberComponents/HomeMemberList';

const HomeScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const shouldChangeLayout = useRef(true);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(max-width: ${ScreenSize.SM_MAX})`);

        const handleMediaQueryChange = (matches: boolean) => {
            if (!shouldChangeLayout.current) {
                return;
            }

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

        return () => {
            shouldChangeLayout.current = false;
            mediaQueryList.removeEventListener("change", (event) => {
                handleMediaQueryChange(event.matches);
            });
        };
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
                <PostFeed>
                    {isMobileScreen && (
                        <AddMemberCard />
                    )}
                    {!loadingFamilies && <h1>Family Posts!</h1>}
                    {loadingFamilies && <LoadingSpinner />}
                </PostFeed>
                <MemberList>
                    <HomeMemberList />
                </MemberList>
                <QuotesSection>

                </QuotesSection>
            </HomeScreenContent>
        </Screen>
    );
};

export default HomeScreen;
