import gql from 'graphql-tag';
import { POST_FRAGMENT } from './fragments';

export const CREATE_POST_MUTATION = gql`
    mutation($input: CreatePostInput!) {
        createPost(input: $input) {
            ...post
        }
    }

    ${POST_FRAGMENT}
`;