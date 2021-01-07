export interface IPost {
    _id: string;
    title: string;
    content?: string;
    image?: {
        url: string;
    };
    author: PostAuthor;
    family: PostFamily;
    createdAt: string;
    updatedAt: string;
}

export interface PostAuthor {
    _id: string;
    name: string;
    image: {
        url: string;
    };
}

export interface PostFamily {
    _id: string;
    name: string;
    creator: PostFamilyCreator;
}


interface PostFamilyCreator {
    _id: string;
    name: string;
    email: string;
}
