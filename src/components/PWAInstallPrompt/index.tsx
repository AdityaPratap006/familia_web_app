import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddToHomescreenPrompt } from '../../hooks/addToHomescreenPrompt.hook';
import Button from '../Button';
import Modal from '../Modal';
import { StyledText } from './style';

const PWAInstallPrompt: React.FC = () => {
    const { promptState, promptToInstall, setPromptState } = useAddToHomescreenPrompt();
    const [visible, setVisible] = useState(false);
    const justPrompted = useRef(false);

    const hidePrompt = () => {
        setVisible(false);
    }

    useEffect(() => {
        if (promptState) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [promptState]);

    const installHandler = async () => {
        try {
            if (promptState) {
                await promptToInstall();

                const result = await promptState.userChoice;

                if (result.outcome === 'accepted') {
                    toast.success('Installing Familia App');
                    setPromptState(null);
                    hidePrompt();
                    justPrompted.current = true;
                } else {
                    toast.warn('Installation denied');
                    hidePrompt();
                }
            }

        } catch (error) {
            toast.error(error.message);
            hidePrompt();
            justPrompted.current = true;
        }
    }

    return (
        <Modal
            show={visible && !justPrompted.current}
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
