import React from 'react';
import { HomeScreenContent } from './style';
import Screen from '../../components/Screen';

const HomeScreen: React.FC = () => {
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
