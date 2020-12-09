import React from 'react';
import { BackgroundSettingsContainer, SettingsGrid, ThemeSettingsContainer, SettingsScreenContent } from './style';
import BackgroundSettings from '../../components/SettingsComponents/BackgroundSettings';
import PrimaryColorSettings from '../../components/SettingsComponents/PrimaryColorSettings';
import Screen from '../../components/ScreenComponents/Screen';

const SettingsScreen = () => {
    return (
        <Screen
            title="settings"
            stackedUpScreen
            withGoBackButton
        >
            <SettingsScreenContent>
                <SettingsGrid>
                    <BackgroundSettingsContainer>
                        <BackgroundSettings />
                    </BackgroundSettingsContainer>
                    <ThemeSettingsContainer>
                        <PrimaryColorSettings />
                    </ThemeSettingsContainer>
                </SettingsGrid>
            </SettingsScreenContent>
        </Screen>
    );
};

export default SettingsScreen;
