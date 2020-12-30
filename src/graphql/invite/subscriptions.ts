import gql from 'graphql-tag';
import { INVITE_FRAGMENT } from './fragments';

export const INVITE_CREATED_SUBSCRIPTION = gql`
    subscription {
        inviteCreated {
            ...invite
        }
    }

    ${INVITE_FRAGMENT}
`;