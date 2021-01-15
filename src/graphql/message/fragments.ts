import gql from 'graphql-tag';

export const MESSAGE_FRAGMENT = gql`
    fragment message on Message {
        _id,
        text,
        from {
            _id,
            name,
            email,
            image {
                url,
            }
        },
        to {
            _id,
            name,
            email,
            image {
                url,
            }
        },
        family,
        createdAt,
        updatedAt,
    }
`;