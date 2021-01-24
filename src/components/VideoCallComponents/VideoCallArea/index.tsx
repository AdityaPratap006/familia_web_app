import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';
import { FamilyContext } from '../../../contexts/family.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { MessageUser } from '../../../models/message';
import { RoomIOEvents, SignalIOEvents, UserIOEvents } from '../../../utils/socket-events';
import { MyVideo, StyledVideoCallArea, PartnerVideo } from './style';

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

interface PeerData {
    peerID: string;
    peer: Peer.Instance;
}

interface UserJoinedPayload {
    callerID: string;
    signal: Peer.SignalData;
}

interface ReceivingReturnedSingalPayload {
    id: string;
    signal: Peer.SignalData;
}

const VideoCallArea: React.FC<VideoCallAreaProps> = ({ toUser: otherPerson }) => {
    const { currentFamily } = useContext(FamilyContext);
    const { profile: me } = useContext(UserProfileContext);
    const [peers, setPeers] = useState<PeerData[]>([]);
    const socketRef = useRef<Socket>();
    const myVideoRef = useRef<HTMLVideoElement>(null);
    const peersRef = useRef<PeerData[]>([]);

    useEffect(() => {
        const myVideoElement = myVideoRef.current;

        return () => {
            if (myVideoElement) {
                const stream = myVideoElement.srcObject;
                if (stream && stream instanceof MediaStream) {
                    stream.getTracks().forEach(track => {
                        track.stop();
                    });
                }
                myVideoElement.srcObject = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!currentFamily || !me) {
            return;
        }
        socketRef.current = io(`${socketIOURL}`, {
            transports: ['polling'],
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true, }).then(stream => {
            if (myVideoRef.current && socketRef.current) {
                myVideoRef.current.srcObject = stream;
                const roomID = getVideoCallRoomId(currentFamily._id, me._id, otherPerson._id)
                socketRef.current.emit(RoomIOEvents.JOIN_ROOM, roomID);

                socketRef.current.on(UserIOEvents.ALL_USERS, (userSocketIDs: string[]) => {
                    const peerList: PeerData[] = [];
                    userSocketIDs.forEach(userSocketID => {
                        if (socketRef.current) {
                            const peer = createPeer(userSocketID, socketRef.current.id, stream);
                            const peerData: PeerData = {
                                peerID: userSocketID,
                                peer,
                            }
                            peersRef.current.push(peerData);
                            peerList.push(peerData);
                        }
                    });
                    setPeers(peerList);
                });

                socketRef.current.on(UserIOEvents.USER_JOINED, (payload: UserJoinedPayload) => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    const peerData: PeerData = {
                        peerID: payload.callerID,
                        peer,
                    }
                    const existingPeerIndex = peersRef.current.findIndex(p => p.peerID === peerData.peerID);
                    if (existingPeerIndex === -1) {
                        peersRef.current.push(peerData);
                    } else {
                        peersRef.current[existingPeerIndex] = peerData;
                    }
                    
                    setPeers(peerList => {
                        const existingPeerIndex = peerList.findIndex(p => p.peerID === peerData.peerID);
                        let newPeerList: PeerData[] = [];
                        if (existingPeerIndex === -1) {
                            newPeerList = [...peerList, peerData]
                        } else {
                            peerList[existingPeerIndex] = peerData;
                            newPeerList = [...peerList];
                        }
                        return newPeerList;
                    });
                });

                socketRef.current.on(SignalIOEvents.RECEIVING_RETURNED_SIGNAL, (payload: ReceivingReturnedSingalPayload) => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    if (item) {
                        item.peer.signal(payload.signal);
                    }
                });

                socketRef.current.on(UserIOEvents.USER_DISCONNECTED, (userSocketID: string) => {
                    const peerData = peersRef.current.find(p => p.peerID === userSocketID);
                    if (peerData) {
                        peerData.peer.destroy();
                    }
                    const peers = peersRef.current.filter(p => p.peerID !== userSocketID);
                    peersRef.current = peers;
                    setPeers(peers);
                });

                socketRef.current.on(RoomIOEvents.ROOM_FULL, () => {
                    toast.error(`Room full!! Can't connect, try later!`);
                });
            }
        }).catch(err => {
            console.log(err);
            toast.error(err.message);
        });


        const mySocket = socketRef.current;

        return () => {
            if (mySocket) {
                mySocket.disconnect();
            }
        };
    }, [currentFamily, me, otherPerson]);

    const createPeer = (userToSignal: string, callerID: string, stream: MediaStream): Peer.Instance => {
        const newPeer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        newPeer.on('signal', (signal: Peer.SignalData) => {
            if (socketRef.current) {
                socketRef.current.emit(SignalIOEvents.SENDING_SIGNAL, {
                    userToSignal,
                    callerID,
                    signal,
                });
            }
        });

        return newPeer;
    }

    const addPeer = (incomingSignal: Peer.SignalData, callerID: string, stream: MediaStream): Peer.Instance => {
        const newPeer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        newPeer.on('signal', (signal: Peer.SignalData) => {
            if (socketRef.current) {
                socketRef.current.emit(SignalIOEvents.RETURNING_SIGNAL, { callerID, signal });
            }
        });

        newPeer.signal(incomingSignal);
        return newPeer;
    }

    return (
        <StyledVideoCallArea>
            {peers.map((peerData: PeerData) => {
                return (
                    <PeerVideo key={peerData.peerID} peerData={peerData} />
                );
            })}
            <MyVideo
                muted
                ref={myVideoRef}
                autoPlay
                playsInline
            />
        </StyledVideoCallArea>
    );
};

export default VideoCallArea;

interface PeerVideoProps {
    peerData: PeerData;
}

const PeerVideo: React.FC<PeerVideoProps> = ({ peerData }) => {
    const { peer } = peerData;
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        peer.on('stream', (stream: MediaStream) => {
            if (ref.current) {
                ref.current.srcObject = stream;
            }
        });
    }, [peer]);

    return (
        <PartnerVideo
            ref={ref}
            playsInline
            autoPlay
        />
    );
} 