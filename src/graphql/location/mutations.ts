import gql from 'graphql-tag';
import { LOCATION_FRAGMENT } from './fragments';

export const UPDATE_USER_LOCATION_MUTATION = gql`
    mutation($input: UpdateUserLocationInput!) {
        updateUserLocation(input: $input) {
            ...location
        }
    }

    ${LOCATION_FRAGMENT}
`;