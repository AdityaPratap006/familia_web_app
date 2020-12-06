import gql from 'graphql-tag';

export const GET_USER_PROFILE_QUERY = gql`
    query {
        profile {
            _id,
            name,
            email,
            about,
            image {
                public_id,
                url,
            },
            createdAt,
            updatedAt,
        }
    }
`;