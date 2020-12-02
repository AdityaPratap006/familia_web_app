import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { HomeScreenContent } from './style';
import Screen from '../../components/Screen';
import { FamilyContext } from '../../contexts/family.context';

const HomeScreen: React.FC = () => {
    const { families, loadingFamilies } = useContext(FamilyContext);

    console.log(loadingFamilies, families);

    if (families?.length) {
        toast.warn(`First family: ${families[0].name}`);
    }

    return (
        <Screen
            title="Home"
        >
            <HomeScreenContent>
                <h1>Family Posts!</h1>
            </HomeScreenContent>
        </Screen>
    );
};

export default HomeScreen;
