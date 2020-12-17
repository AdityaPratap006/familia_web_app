import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { HomeScreenContent } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { FamilyContext } from '../../contexts/family.context';
import LoadingSpinner from '../../components/LoadingSpinner';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';

const HomeScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);

    useEffect(() => {
        if (!loadingFamilies && families.length === 0) {
            toast.warn(`Create a family!`);
        }
    }, [loadingFamilies, families]);

    useEffect(() => {
        console.log(loadingFamilies, currentFamily);
        if (!loadingFamilies && currentFamily) {
            toast.success(`Current family: ${currentFamily.name}`);
        }
    }, [loadingFamilies, currentFamily]);

    return (
        <Screen
            title="Home"
            subTitle={currentFamily?.name}
            rightComponent={<CurrentFamilyIndicator />}
        >
            <HomeScreenContent>
                {!loadingFamilies && <h1>Family Posts!</h1>}
                {loadingFamilies && <LoadingSpinner />}
            </HomeScreenContent>
        </Screen>
    );
};

export default HomeScreen;
