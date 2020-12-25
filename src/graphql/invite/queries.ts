import gql from 'graphql-tag';
import { INVITE_FRAGMENT } from './fragments';

export const GET_INVITES_RECEIVED_BY_USER = gql`
    query {
        getInvitesReceivedByUser {
            ...invite
        }
    }

    ${INVITE_FRAGMENT}
`;