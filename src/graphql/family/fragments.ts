import gql from 'graphql-tag';

export const FAMILY_FRAGMENT = gql`
    fragment family on Family {
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
`;