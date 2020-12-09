import { ProfileImage } from "./user";

export interface IMember {
    _id: string;
    name: string;
    email: string;
    about: string;
    image: {
        url: ProfileImage['url'],
    };
}