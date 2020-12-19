import gql from 'graphql-tag';

export const FAMILY_FRAGMENT = gql`
    fragment family on Family {
        _id,
        name,
        memberCount,
        description,
        creator {
            _id,
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