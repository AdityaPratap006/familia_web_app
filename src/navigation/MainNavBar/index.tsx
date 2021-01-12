import React from 'react';
import AppLogo from '../AppLogo';
import MainNavLinks from '../MainNavLinks';
import { StyledNav } from './style';

const MainNavBar: React.FC = () => {
    return (
        <StyledNav>
            <AppLogo />
            <MainNavLinks />
        </StyledNav>
    );
};

export default MainNavBar;
