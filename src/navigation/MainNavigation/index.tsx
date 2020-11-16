import React, { useContext } from 'react';
import { MainContainer } from './style';
import MainNavBar from '../MainNavBar';
import SideDrawer from '../SideDrawer';
import BackDrop from '../../components/BackDrop';
import { SideDrawerContext } from '../../contexts/sidedrawer.context';
import BottomAppBar from '../BottomAppBar';

const MainNavigation: React.FC = ({ children }) => {
    const sideDrawerCTX = useContext(SideDrawerContext);

    const closeDrawerHandler = () => {
        sideDrawerCTX.close();
    }

    return (
        <React.Fragment>
            <MainNavBar />
            <BackDrop show={sideDrawerCTX.isOpen} onClick={closeDrawerHandler} />
            <SideDrawer show={sideDrawerCTX.isOpen} onClose={closeDrawerHandler} />
            <MainContainer>
                {children}
            </MainContainer>
            <BottomAppBar />
        </React.Fragment>
    );
};

export default MainNavigation;
