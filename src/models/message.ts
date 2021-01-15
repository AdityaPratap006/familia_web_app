export interface IMessage {
    _id: string;
    text: string;
    family: string;
    createdAt: string;
    updatedAt: string;
    from: MessageUser;
    to: MessageUser;
}

export interface MessageUser {
    _id: string;
    name: string;
    email: string;
    image: {
        url: string;
    };
}