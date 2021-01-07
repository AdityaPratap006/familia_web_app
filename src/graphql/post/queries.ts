import gql from 'graphql-tag';
import { POST_FRAGMENT } from './fragments';

export const GET_ALL_POSTS_IN_FAMILY = gql`
    query($input: AllPostsInFamilyInput!) {
        allPostsInFamily(input: $input) {
            ...post
        }
    }

    ${POST_FRAGMENT}
`;