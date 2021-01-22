import React, { useState } from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import VideoCallPortal from '../VideoCallPortal';
import { VideoCallButton } from './style';

const StartVideoCallButton: React.FC = () => {
    const [videoCallPortalOpen, setVideoCallPortalOpen] = useState(false);

    const openVideoCallPortalHandler = () => {
        setVideoCallPortalOpen(true);
    }

    const closeVideoCallPortalHandler = () => {
        setVideoCallPortalOpen(false);
    }

    return (
        <React.Fragment>
            <VideoCallPortal
                show={videoCallPortalOpen}
                closePortal={closeVideoCallPortalHandler}
            />
            <VideoCallButton onClick={openVideoCallPortalHandler}>
                <BsFillCameraVideoFill className="icon" />
            </VideoCallButton>
        </React.Fragment>
    );
};

export default StartVideoCallButton;
