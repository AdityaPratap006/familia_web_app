import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { VideoCallContainer, VideoCallHeader, VideoCallContent, VideoCallFooter } from './style';
import BackDrop from '../../BackDrop';
import Button from '../../Button';
import { VideoCallArea } from '../VideoCallArea/style';

interface VideoCallOverlayProps {
    closeOverlay: () => void;
}

const VideoCallOverlay: React.FC<VideoCallOverlayProps> = ({ closeOverlay }) => {
    const content = (
        <VideoCallContainer>
            <VideoCallHeader>
                <h2>Video Call</h2>
            </VideoCallHeader>
            <VideoCallContent>
                <VideoCallArea />
            </VideoCallContent>
            <VideoCallFooter>
                <Button type="button" inverse onClick={closeOverlay}>Leave</Button>
            </VideoCallFooter>
        </VideoCallContainer>
    );

    return ReactDOM.createPortal(content, document.getElementById('VideoCall-hook') as HTMLElement);
}

interface VideoCallPortalProps {
    show: boolean;
    closePortal: () => void;
}

const VideoCallPortal: React.FC<VideoCallPortalProps> = props => {
    return (
        <React.Fragment>
            <BackDrop show={props.show} onClick={props.closePortal} />
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames={{
                    enterActive: 'VideoCall-enter-active',
                    enterDone: 'VideoCall-enter-done',
                    exitActive: 'VideoCall-exit-active',
                    exit: 'VideoCall-exit',
                }}
            >
                <VideoCallOverlay closeOverlay={props.closePortal} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default VideoCallPortal;
