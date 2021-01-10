import gql from 'graphql-tag';
import { LIKE_FRAGMENT } from './fragments';

export const ON_LIKED_SUBSCRIPTION = gql`
    subscription {
        onLiked {
            ...like
        }
    }

    ${LIKE_FRAGMENT}
`;

export const ON_UNLIKED_SUBSCRIPTION = gql`
    subscription {
        onUnliked {
            ...like
        }
    }
    
    ${LIKE_FRAGMENT}
`;