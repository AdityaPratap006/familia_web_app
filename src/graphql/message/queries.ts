import gql from 'graphql-tag';
import { MESSAGE_FRAGMENT } from './fragments';

export const GET_ALL_CHAT_MESSAGES = gql`
    query($input: AllChatMessagesInput!) {
        totalChatMessages(input: $input)
        allChatMessages(input: $input) {
            ...message
        }
    }

    ${MESSAGE_FRAGMENT}
`;