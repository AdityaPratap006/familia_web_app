import gql from 'graphql-tag';
import { MEMORY_FRAGMENT } from './fragments';

export const CREATE_MEMORY_MUTATION = gql`
    mutation($input: CreateMemoryInput!) {
        createMemory(input: $input) {
            ...memory
        }
    }

    ${MEMORY_FRAGMENT}
`;