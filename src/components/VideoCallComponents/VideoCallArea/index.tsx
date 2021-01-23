import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import { FamilyContext } from '../../../contexts/family.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { MessageUser } from '../../../models/message';
import { RoomIOEvents, UserIOEvents } from '../../../utils/socket-events';
import { MyVideo, StyledVideoCallArea } from './style';

const socketIOURL = process.env.REACT_APP_SOCKETIO_URL;

interface VideoCallAreaProps {
    toUser: MessageUser;
}

const getVideoCallRoomId = (familyId: string, user1Id: string, user2Id: string) => {
    const sortedUserIds = [user1Id, user2Id].sort((a, b) => {
        return a.localeCompare(b);
    }).join(`-`);

    const videoCallRoomId = `${familyId}_${sortedUserIds}`;
    return videoCallRoomId;
}

const VideoCallArea: React.FC<VideoCallAreaProps> = ({ toUser: otherPerson }) => {
    const { currentFamily } = useContext(FamilyContext);
    const { profile: me } = useContext(UserProfileContext);
    const [stream, setStream] = useState<MediaStream>();

    const socket = useRef<Socket>();
    const myVideo = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        document.title = "Video Call | Familia";

        return () => {
            document.title = "Chats | Familia";
            socket.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!currentFamily || !me) {
            return;
        }

        socket.current = io(`${socketIOURL}`, {
            transports: ['polling'],
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true, }).then(currentStream => {
            setStream(currentStream);
        }).catch(err => {
            console.log(err);
            toast.error(err.message);
        });

        const videoCallRoomId = getVideoCallRoomId(currentFamily._id, me._id, otherPerson._id);
        console.log({ videoCallRoomId });

        socket.current.emit(RoomIOEvents.JOIN_ROOM, videoCallRoomId, me._id);

        socket.current.on(UserIOEvents.USER_CONNECTED, (userId: string) => {
            console.log({ joinedCall: userId });
        });

        socket.current.on(UserIOEvents.USER_DISCONNECTED, (userId: string) => {
            console.log({ leftCall: userId });
        });

    }, [currentFamily, me, otherPerson]);

    useEffect(() => {
        const myVideoElement = myVideo.current;
        if (myVideoElement && stream) {
            myVideoElement.srcObject = stream;
        }

        return () => {
            if (myVideoElement) {
                myVideoElement.srcObject = null;
            }

            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [stream]);


    return (
        <StyledVideoCallArea>
            {stream && (
                <MyVideo
                    ref={myVideo}
                    playsInline
                    autoPlay
                />
            )}
        </StyledVideoCallArea>
    );
};

export default VideoCallArea;
