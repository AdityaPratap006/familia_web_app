export enum SocketIOEvents {
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',
}

export enum UserIOEvents {
    YOUR_ID = 'yourID',
    ALL_USERS = 'allUsers',
    USER_CONNECTED = 'user-connected',
    USER_DISCONNECTED = 'user-disconnected',
    USER_JOINED = 'user-joined',
}

export enum VideoCallIOEvents {
    CALL_USER = 'callUser',
    ACCEPT_CALL = 'acceptCall',
    INCOMING_CALL = 'incomingCall',
    CALL_ACCEPTED = 'callAccepted',
}

export enum RoomIOEvents {
    JOIN_ROOM = 'join-room',
    ROOM_FULL = 'room-full',
}

export enum SignalIOEvents {
    SENDING_SIGNAL = 'sending-signal',
    RETURNING_SIGNAL = 'returning-signal',
    RECEIVING_RETURNED_SIGNAL = 'receiving-returned-signal',
}