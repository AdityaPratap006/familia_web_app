export interface ILike {
    _id: string;
    post: string;
    likedBy: LikedByUserData;
    createdAt: string;
    updatedAt: string;
}

export interface LikedByUserData {
    _id: string;
    name: string;
    image: {
        url: string;
    };
}