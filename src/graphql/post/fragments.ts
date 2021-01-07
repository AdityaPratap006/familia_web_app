import gql from 'graphql-tag';

export const POST_FRAGMENT = gql`
    fragment post on Post {
        _id,
        title,
        content,
        image {
            url,
        },
        createdAt,
        updatedAt,
        author{
            _id,
            name,
            image {
                url
            }
        },
        family {
            _id,
            name,
            creator {
                _id,
                name,
                email,
            }
        }
    }
`;