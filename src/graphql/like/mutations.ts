import gql from 'graphql-tag';
import { LIKE_FRAGMENT } from './fragments';

export const CREATE_LIKE_MUTATION = gql`
    mutation($input: CreateLikeInput!) {
        createLike(input: $input) {
            ...like
        }
    }

    ${LIKE_FRAGMENT}
`;

export const DELETE_LIKE_MUTATION = gql`
    mutation($input: DeleteLikeInput!) {
        deleteLike(input: $input)
    }
`;