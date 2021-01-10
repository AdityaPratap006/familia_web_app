import gql from 'graphql-tag';
import { LIKE_FRAGMENT } from './fragments';

export const GET_ALL_LIKES_ON_POST = gql`
    query($input: AllLikesOnPostInput!) {
        allLikesOnPost(input: $input) {
            ...like
        }
    }

    ${LIKE_FRAGMENT}
`;

export const IS_POST_LIKED_BY_USER = gql`
    query($input: IsPostLikedByUserInput!) {
        isPostLikedByUser(input: $input)
    }
`;