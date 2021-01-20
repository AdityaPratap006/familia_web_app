import gql from 'graphql-tag';

export const MEMORY_FRAGMENT = gql`
    fragment memory on Memory {
        _id,
        type,
        content,
        date,
        family {
            _id,
            name,
        },
        createdAt,
        updatedAt,
    }
`;