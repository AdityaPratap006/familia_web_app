export interface IUser {
    token: string;
    name: string;
    email: string;
    signInProvider: string;
}

export interface ProfileImage {
    url: string;
    public_id: string;
}

export interface IUserProfile {
    _id: string;
    name: string;
    email: string;
    about: string;
    createdAt: string;
    updatedAt: string;
    images: ProfileImage;
    fcmToken?: string;
}