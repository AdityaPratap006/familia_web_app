import gql from 'graphql-tag';
import { USER_PROFILE_FRAGMENT } from './fragments';

export const CREATE_USER_MUTATION = gql`
    mutation {
        createUser {
            ...userProfile
        }
    }

    ${USER_PROFILE_FRAGMENT}
`;