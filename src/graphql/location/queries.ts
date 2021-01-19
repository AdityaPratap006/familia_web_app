import gql from 'graphql-tag';
import { LOCATION_FRAGMENT } from './fragments';

export const GET_MEMBER_LOCATIONS = gql`
    query($input: GetMemberLocationsInput!) {
        memberLocations(input: $input) {
            ...location
        }
    }

    ${LOCATION_FRAGMENT}
`;