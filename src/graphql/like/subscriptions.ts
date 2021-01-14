import gql from 'graphql-tag';
import { LIKE_FRAGMENT } from './fragments';

export const ON_LIKED_SUBSCRIPTION = gql`
    subscription($input: OnLikedInput!) {
        onLiked(input: $input) {
            ...like
        }
    }

    ${LIKE_FRAGMENT}
`;

export const ON_UNLIKED_SUBSCRIPTION = gql`
    subscription($input: OnUnlikedInput!) {
        onUnliked(input: $input) {
            ...like
        }
    }
    
    ${LIKE_FRAGMENT}
`;