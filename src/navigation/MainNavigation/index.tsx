import React from 'react';
import { MainContainer } from './style';
import MainNavBar from '../MainNavBar';

const MainNavigation: React.FC = ({ children }) => {
    return (
        <React.Fragment>
            <MainNavBar />
            <MainContainer>
                {children}
            </MainContainer>
        </React.Fragment>
    );
};

export default MainNavigation;
