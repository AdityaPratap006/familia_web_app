import gql from 'graphql-tag';
import { MESSAGE_FRAGMENT } from './fragments';

export const ON_MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription($input: OnMessageAddedInput!) {
        onMessageAdded(input: $input) {
            ...message
        }
    }

    ${MESSAGE_FRAGMENT}
`;

export const ON_MESSAGE_DELETED_SUBSCRIPTION = gql`
    subscription($input: OnMessageDeletedInput!) {
        onMessageDeleted(input: $input) {
            ...message
        }
    }

    ${MESSAGE_FRAGMENT}
`;