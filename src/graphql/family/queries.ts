import gql from 'graphql-tag';
import { FAMILY_FRAGMENT } from './fragments';

export const GET_FAMILIES_OF_USER_QUERY = gql`
    query {
        getFamiliesOfUser {
            ...family
        }
    }

    ${FAMILY_FRAGMENT}
`;

export const GET_MEMBERS_OF_A_FAMILY_QUERY = gql`
    query($input: GetMembersInput!) {
        getMembersOfAFamily(input: $input){
            _id,
            name,
            email,
            image {
                url,
            },
            about,
        }
    }
`;