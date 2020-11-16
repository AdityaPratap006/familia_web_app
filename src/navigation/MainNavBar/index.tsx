import React from 'react';
import MainNavLinks from '../MainNavLinks';
import { StyledNav } from './style';

const MainNavBar: React.FC = () => {
    return (
        <StyledNav>
            <MainNavLinks />
        </StyledNav>
    );
};

export default MainNavBar;
