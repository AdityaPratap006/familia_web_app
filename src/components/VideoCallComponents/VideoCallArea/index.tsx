import React, { useContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { FamilyContext } from '../../../contexts/family.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { MessageUser } from '../../../models/message';
import { RoomIOEvents, UserIOEvents } from '../../../utils/socket-events';
import { StyledVideoCallArea } from './style';

const socketIOURL = process.env.REACT_APP_SOCKETIO_URL;

interface VideoCallAreaProps {
    toUser: MessageUser;
}

const VideoCallArea: React.FC<VideoCallAreaProps> = ({ toUser: otherPerson }) => {
    const { currentFamily } = useContext(FamilyContext);
    const { profile: me } = useContext(UserProfileContext);

    const socket = useRef<Socket>();

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

        const sortedUserIds = [me._id, otherPerson._id].sort((a, b) => {
            return a.localeCompare(b);
        }).join(`-`);

        const videoCallRoomId = `${currentFamily._id}_${sortedUserIds}`;
        console.log({ videoCallRoomId });

        socket.current.emit(RoomIOEvents.JOIN_ROOM, videoCallRoomId, me._id);

        socket.current.on(UserIOEvents.USER_CONNECTED, (userId: string) => {
            console.log({ joinedCall: userId });
        });

        socket.current.on(UserIOEvents.USER_DISCONNECTED, (userId: string) => {
            console.log({ leftCall: userId });
        });

    }, [currentFamily, me, otherPerson]);

    return (
        <StyledVideoCallArea>

        </StyledVideoCallArea>
    );
};

export default VideoCallArea;
