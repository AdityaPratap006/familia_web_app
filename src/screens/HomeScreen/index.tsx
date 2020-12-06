import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { HomeScreenContent } from './style';
import Screen from '../../components/Screen';
import { FamilyContext } from '../../contexts/family.context';
import LoadingSpinner from '../../components/LoadingSpinner';
import CurrentFamilyIndicator from '../../components/CurrentFamilyIndicator';

const HomeScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);

    console.log(loadingFamilies, currentFamily);

    useEffect(() => {
        if (!loadingFamilies && families.length === 0) {
            toast.warn(`Create a family!`);
        }
    }, [loadingFamilies, families]);

    useEffect(() => {
        if (!loadingFamilies && currentFamily) {
            toast.success(`Current family: ${currentFamily.name}`);
        }
    }, [loadingFamilies, currentFamily]);

    return (
        <Screen
            title="Home"
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
