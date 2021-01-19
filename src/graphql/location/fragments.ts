import gql from 'graphql-tag';

export const LOCATION_FRAGMENT = gql`
    fragment location on UserLocation {
        _id,
        user {
            _id,
            email,
            name,
            image {
                url,
            },
        },
        location {
            type,
            coordinates,
        },
        createdAt,
        updatedAt 
    }
`;