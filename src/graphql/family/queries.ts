import { gql } from '@apollo/client';

export const GET_FAMILIES_OF_USER_QUERY = gql`
    query {
        getFamiliesOfUser {
            _id,
            name,
            description,
            memberCount,
            creator {
                _id,
                name,
                email,
                about,
                image {
                    url,
                },
            },
            createdAt,
            updatedAt,
        }
    }
`;