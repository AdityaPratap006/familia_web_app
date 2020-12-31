import gql from 'graphql-tag';
import { INVITE_FRAGMENT } from './fragments';

export const INVITE_CREATED_SUBSCRIPTION = gql`
    subscription {
        onInviteCreated {
            ...invite
        }
    }

    ${INVITE_FRAGMENT}
`;

export const INVITE_DELETED_SUBSCRIPTION = gql`
    subscription {
        onInviteDeleted
    }
`;