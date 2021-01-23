export enum SocketIOEvents {
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',
}

export enum UserIOEvents {
    YOUR_ID = 'yourID',
    ALL_USERS = 'allUsers',
    USER_CONNECTED = 'user-connected',
    USER_DISCONNECTED = 'user-disconnected',
}

export enum VideoCallIOEvents {
    CALL_USER = 'callUser',
    ACCEPT_CALL = 'acceptCall',
    INCOMING_CALL = 'incomingCall',
    CALL_ACCEPTED = 'callAccepted',
}

export enum RoomIOEvents {
    JOIN_ROOM = 'join-room',
}