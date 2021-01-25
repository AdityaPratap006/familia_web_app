import gql from 'graphql-tag';
import { MESSAGE_FRAGMENT } from './fragments';

export const CREATE_MESSAGE_MUTATION = gql`
    mutation($input: CreateMessageInput!) {
        createMessage(input: $input) {
            ...message
        }
    }

    ${MESSAGE_FRAGMENT}
`;

export const DELETE_MESSAGE_MUTATION = gql`
    mutation($input: DeleteMessageInput!) {
        deleteMessage(input: $input) {
            ...message
        }
    }

    ${MESSAGE_FRAGMENT}
`;