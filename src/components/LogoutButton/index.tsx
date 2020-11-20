import React, { useState } from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { LogoutIconContainer, logoutBtnStyle, LogoutWarningContent } from './style';
import Button from '../Button';
import { firebaseAuth } from '../../utils/firebase';
import Modal from '../Modal';

const LogoutButton: React.FC = () => {
    const [showLogoutWarning, setShowLogoutWarning] = useState(false);

    const showLogoutWarningHandler = () => {
        setShowLogoutWarning(true)
    };

    const cancelLogoutWarningHandler = () => {
        setShowLogoutWarning(false);
    }

    const confirmLogoutHandler = () => {
        firebaseAuth.signOut();
    }

    return (
        <React.Fragment>
            <Button addcss={logoutBtnStyle} onClick={showLogoutWarningHandler}>
                <LogoutIconContainer>
                    <FaPowerOff className='icon' />
                </LogoutIconContainer>
                <span>LOGOUT</span>
            </Button>
            <Modal
                overSideDrawer
                show={showLogoutWarning}
                onCancel={cancelLogoutWarningHandler}
                headerComponent="Are you sure?"
                footerComponent={
                    <React.Fragment>
                        <Button inverse onClick={cancelLogoutWarningHandler}>NO</Button>
                        <Button onClick={confirmLogoutHandler}>YES</Button>
                    </React.Fragment>
                }
            >
                <LogoutWarningContent>
                    <p>Do you want to logout?</p>
                </LogoutWarningContent>
            </Modal>
        </React.Fragment>
    );
};

export default LogoutButton;