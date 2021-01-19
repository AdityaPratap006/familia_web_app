import React from 'react';
import { Marker } from 'react-map-gl';
import { MdLocationOn } from 'react-icons/md';
import { PinIconContainer } from './style';

interface MarkerPosition {
    lat: number;
    long: number;
}

const CustomMarker: React.FC<MarkerPosition> = ({ lat, long }) => {
    return (
        <>
            <Marker
                latitude={lat}
                longitude={long}
                offsetLeft={-19}
                offsetTop={-37}
            >
                <PinIconContainer>
                    <MdLocationOn className='icon' />
                </PinIconContainer>
            </Marker>
        </>
    );
};

export default CustomMarker;
