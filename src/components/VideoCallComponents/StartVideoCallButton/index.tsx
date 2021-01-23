import React, { useState } from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { MessageUser } from '../../../models/message';
import VideoCallPortal from '../VideoCallPortal';
import { VideoCallButton } from './style';

interface StartVideoCallButtonProps {
    toUser: MessageUser;
}

const StartVideoCallButton: React.FC<StartVideoCallButtonProps> = ({ toUser }) => {
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
                toUser={toUser}
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
