import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddToHomescreenPrompt } from '../../hooks/addToHomescreenPrompt.hook';
import Button from '../Button';
import Modal from '../Modal';
import { StyledText } from './style';

const PWAInstallPrompt: React.FC = () => {
    const { promptState, promptToInstall } = useAddToHomescreenPrompt();

    const [visible, setVisible] = useState(false);

    const hidePrompt = () => {
        setVisible(false);
    }

    useEffect(() => {
        if (promptState) {
            setVisible(true);
        }
    }, [promptState]);

    const installHandler = () => {
        try {
            promptToInstall();
            
            promptState?.userChoice
            .then(result => {
                if (result.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
            })
            .catch(err => {
                throw err;
            });

        } catch (error) {
            toast.error(error.message);
        } finally {
            hidePrompt();
        }
    }

    return (
        <Modal
            show={visible}
            onCancel={hidePrompt}
            headerComponent="Install Familia on your device!"
            footerComponent={
                <React.Fragment>
                    <Button type="button" inverse onClick={hidePrompt}>
                        CANCEL
                    </Button>
                    <Button type="button" onClick={installHandler}>
                        INSTALL
                    </Button>
                </React.Fragment>
            }
        >
            <StyledText>
                You will be able to access Familia as a native mobile or desktop app from your
                device Home Screen! Install it now :)
            </StyledText>
        </Modal>
    );
};

export default PWAInstallPrompt;
