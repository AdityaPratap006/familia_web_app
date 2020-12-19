import { IUserProfile, ProfileImage} from './user';

export interface FamilyMember {
    _id: IUserProfile['_id'];
    name: IUserProfile['name'];
    email: IUserProfile['email'];
    about: IUserProfile['about'];
    image: {
        url: ProfileImage['url'];
    };
}

export interface IFamily {
    _id: string;
    name: string;
    memberCount: number;
    description?: string;
    createdAt: string;
    updatedAt: string;
    creator: FamilyMember;
}