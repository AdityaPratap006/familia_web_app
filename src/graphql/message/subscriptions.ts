import gql from 'graphql-tag';
import { MESSAGE_FRAGMENT } from './fragments';

export const CREATE_MESSAGE_MUTATION = gql`
    subscription($input: OnMessageAddedInput!) {
        onMessageAdded(input: $input) {
            ...message
        }
    }

    ${MESSAGE_FRAGMENT}
`;