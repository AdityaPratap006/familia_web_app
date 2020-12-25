import gql from 'graphql-tag';

export const INVITE_FRAGMENT = gql`
    fragment invite on Invite {
        _id,
        family{
            _id,
            name,
            description,
            memberCount,
        },
        from {
            _id,
            name,
            email,
            about,
            image {
                url,
            },
        },
        to {
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
`;