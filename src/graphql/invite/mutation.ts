import gql from 'graphql-tag';
import { INVITE_FRAGMENT } from './fragments';

export const CREATE_INVITE_MUTATION = gql`
    mutation($input: CreateInviteInput!) {
        createInvite(input: $input) {
            ...invite
        }
    }

    ${INVITE_FRAGMENT}
`;