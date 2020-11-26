import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation {
        createUser {
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
    }
`;