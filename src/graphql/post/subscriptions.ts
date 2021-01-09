import gql from 'graphql-tag';
import { POST_FRAGMENT } from './fragments';

export const POST_ADDED_SUBSCRIPTION = gql`
    subscription {
        onPostAdded {
            ...post
        }
    }

    ${POST_FRAGMENT}
`;