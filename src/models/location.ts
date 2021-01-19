export interface IUserLocation {
    _id: string;
    user : {
        _id: string;
        name: string;
        email: string;
        image: {
            url: string;
        };
    };
    location: {
        type: string;
        coordinates: [
            longitude: number,
            latitude: number,
        ];
    };
    createdAt: string;
    updatedAt: string;
}