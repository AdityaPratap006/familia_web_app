import gql from 'graphql-tag';
import { FAMILY_FRAGMENT } from './fragments';

export const CREATE_FAMILY_MUTATION = gql`
    mutation ($input: CreateFamilyInput!) {
        createFamily(input: $input) {
            ...family
        }
    }

    ${FAMILY_FRAGMENT}
`;

