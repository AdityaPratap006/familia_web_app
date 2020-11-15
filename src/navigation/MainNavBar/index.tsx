import React from 'react';
import MainNavLinks from '../MainNavLinks';
import { StyledHeader } from './style';

const MainNavBar: React.FC = () => {
    return (
        <StyledHeader>
            <MainNavLinks />
        </StyledHeader>
    );
};

export default MainNavBar;
