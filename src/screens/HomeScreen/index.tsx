import React from 'react';
import { HomeScreenContent } from './style';
import Screen from '../../components/Screen';

const HomeScreen = () => {
    return (
        <Screen
            title="Home"
        >
            <HomeScreenContent>
                <div style={{
                    backgroundColor: 'lightblue',
                    minHeight: '100vh',
                }}>
                    <h1>Family Posts!</h1>
                </div>
            </HomeScreenContent>
            {/* <h1>Family Posts!</h1> */}
        </Screen>
    );
};

export default HomeScreen;
