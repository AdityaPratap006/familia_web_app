import React, { useContext } from 'react';
import { AddPostButtonSection, HomeScreenContent, MemberList, PostFeed, QuotesSection } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { FamilyContext } from '../../contexts/family.context';
import LoadingSpinner from '../../components/LoadingSpinner';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import OnboardingAddMemberCard from '../../components/Onboarding/OnboardingAddMemberCard';
import HomeMemberList from '../../components/FamilyMemberComponents/HomeMemberList';
import PostList from '../../components/PostComponents/PostList';
import AddPostButton from '../../components/PostComponents/AddPostButton';

const HomeScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);

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
            withBottomPaddingInMobile
        >
            <HomeScreenContent>
                <PostFeed>
                    <OnboardingAddMemberCard />
                    {loadingFamilies && <LoadingSpinner />}
                    {!loadingFamilies && <PostList />}
                </PostFeed>
                <AddPostButtonSection>
                    {!loadingFamilies && <AddPostButton />}
                    {loadingFamilies && <LoadingSpinner small />}
                </AddPostButtonSection>
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
