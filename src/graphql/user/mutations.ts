import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation {
        createUser {
            name,
            email,
            defaultFamilyId,
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

export const SET_DEFAULT_FAMILY_ID = gql`
    mutation($input:  SetDefaultFamilyIdInput) {
        setDefaultFamilyId(input: $input) {
            name,
            email,
            _id,
            defaultFamilyId,
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