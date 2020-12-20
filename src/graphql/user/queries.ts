import gql from 'graphql-tag';
import { USER_PROFILE_FRAGMENT } from './fragments';

export const GET_USER_PROFILE_QUERY = gql`
    query {
        profile {
             ...userProfile
        }
    }

    ${USER_PROFILE_FRAGMENT}
`;

export const SEARCH_USERS_QUERY = gql`
    query($input: SearchUsersInput!) {
        searchUsers(input: $input){
            ...userProfile
        }
    }

    ${USER_PROFILE_FRAGMENT}
`;