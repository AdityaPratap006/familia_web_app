import gql from 'graphql-tag';

export const CREATE_FAMILY_MUTATION = gql`
    mutation ($input: CreateFamilyInput!) {
    createFamily(input: $input) {
            _id,
            name,
            memberCount,
            description,
            creator {
                name,
                email,
                image {
                    url,
                },
            },
            createdAt,
            updatedAt,
        }
    }
`;