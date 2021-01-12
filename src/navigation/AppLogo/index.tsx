import React from 'react';
import { AppLogoImage, AppLogoContainer, AppTitle } from './style';
import FamiliaLogo from '../../assets/familia_logo.png';

const AppLogo = () => {
    return (
        <AppLogoContainer>
            <AppLogoImage alt={'familia-logo'} src={FamiliaLogo} />
            <AppTitle>Familia</AppTitle>
        </AppLogoContainer>
    );
};

export default AppLogo;
