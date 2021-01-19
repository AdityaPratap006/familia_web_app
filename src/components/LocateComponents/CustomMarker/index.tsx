import React from 'react';
import { Marker } from 'react-map-gl';
import { MdLocationOn } from 'react-icons/md';
import { AvatarContainer, MarkerContent, PinIconContainer } from './style';
import Avatar from '../../Avatar';

interface MarkerPosition {
    lat: number;
    long: number;
    userImage: string;
}

const CustomMarker: React.FC<MarkerPosition> = ({ lat, long, userImage }) => {
    return (
        <Marker
            latitude={lat}
            longitude={long}
            offsetLeft={-19}
            offsetTop={-37}
        >
            <MarkerContent>
                <AvatarContainer>
                    <Avatar
                        tiny
                        alt={'member_pin'}
                        src={userImage}
                    />
                </AvatarContainer>
                <PinIconContainer>
                    <MdLocationOn className='icon' />
                </PinIconContainer>
            </MarkerContent>
        </Marker>
    );
};

export default CustomMarker;
