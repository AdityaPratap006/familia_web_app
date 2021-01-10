import gql from 'graphql-tag';

export const LIKE_FRAGMENT = gql`
    fragment like on Like {
        _id,
        post,
        createdAt,
        updatedAt,
        likedBy {
            _id,
            name,
            image {
                url,
            }
        }
    }
`;