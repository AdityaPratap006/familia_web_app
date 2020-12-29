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

export const DELETE_INVITE_MUTATION = gql`
    mutation($input: DeleteInviteInput!) {
        deleteInvite(input: $input)
    }
`;

export const ACCEPT_INVITE_MUTATION = gql`
    mutation($input: AcceptInviteInput!) {
        acceptInvite(input: $input)
    }
`;