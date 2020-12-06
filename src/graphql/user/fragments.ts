import gql from 'graphql-tag';

export const USER_PROFILE_FRAGMENT = gql`
    fragment userProfile on User {
        name,
        email,
        _id,
        about,
        image {
            public_id,
            url,
        },
        createdAt,
        updatedAt,
    }
`;