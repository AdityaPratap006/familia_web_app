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