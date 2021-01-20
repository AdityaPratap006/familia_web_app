import gql from 'graphql-tag';
import { MEMORY_FRAGMENT } from './fragments';

export const GET_ALL_MEMORIES_IN_FAMILY = gql`
    query($input: AllMemoriesInFamilyInput!) {
        allMemoriesInFamily(input: $input) {
            ...memory
        }
    }

    ${MEMORY_FRAGMENT}
`;