import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import ReactMapGL, { ViewportProps, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NavigationControlContainer } from './style';
import { UPDATE_USER_LOCATION_MUTATION } from '../../../graphql/location/mutations';
import { IUserLocation } from '../../../models/location';
import CustomMarker from '../CustomMarker';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import LoadingSpinner from '../../LoadingSpinner';
import { FamilyContext } from '../../../contexts/family.context';
import { GET_MEMBER_LOCATIONS } from '../../../graphql/location/queries';
import { toast } from 'react-toastify';

const mapboxAPIAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

interface MapViewport {
    latitude: number;
    longitude: number;
    zoom: number;
}

interface Position {
    latitude: number;
    longitude: number;
}

const INITIAL_VIEWPORT: MapViewport = {
    latitude: 50,
    longitude: 24,
    zoom: 1,
};

interface UpdateUserLocationResult {
    updateUserLocation: IUserLocation;
}

interface GetMemberLocationsResult {
    memberLocations: IUserLocation[];
}

const CustomMap: React.FC = () => {
    const [mapViewport, setMapViewport] = useState<MapViewport>(INITIAL_VIEWPORT);
    const [myPosition, setMyPosition] = useState<Position>();
    const [updateMyLocationMutation] = useMutation<UpdateUserLocationResult>(UPDATE_USER_LOCATION_MUTATION);
    const { profile } = useContext(UserProfileContext);
    const { currentFamily } = useContext(FamilyContext);
    const [fetchMemberLocations, fetchMemberLocationsResult] = useLazyQuery<GetMemberLocationsResult>(GET_MEMBER_LOCATIONS);

    useEffect(() => {
        getMyPosition();
    }, []);

    useEffect(() => {
        if (myPosition) {
            const sendLocationUpdate = async () => {
                await updateMyLocationMutation({
                    variables: {
                        input: {
                            latitude: myPosition.latitude,
                            longitude: myPosition.longitude,
                        }
                    },
                });
            }

            sendLocationUpdate();
        }
    }, [myPosition, updateMyLocationMutation]);

    useEffect(() => {
        if (currentFamily) {
            fetchMemberLocations({
                variables: {
                    input: {
                        familyId: currentFamily._id,
                    }
                }
            });
        }
    }, [currentFamily, fetchMemberLocations]);

    useEffect(() => {
        if (fetchMemberLocationsResult.error) {
            toast.error(fetchMemberLocationsResult.error.message);
        }
    }, [fetchMemberLocationsResult.error]);

    const handleMapViewportChange = (viewport: ViewportProps) => {
        setMapViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: viewport.zoom,
        });
    }

    const getMyPosition = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const { coords: { latitude, longitude } } = position;

                setMapViewport({
                    latitude,
                    longitude,
                    zoom: 6,
                });

                setMyPosition({
                    latitude: latitude,
                    longitude: longitude,
                });
            });
        }
    }

    if (!profile) {
        return <LoadingSpinner />;
    }

    const renderMemberMarkers = () => {
        const { data } = fetchMemberLocationsResult;

        if (!data) {
            return null;
        }

        const locations = data.memberLocations.filter(loc => loc.user._id === profile._id);

        return locations.map(userLocation => {
            const { _id: pinId, user: { image: { url: imageUrl } }, location: { coordinates } } = userLocation;
            return (
                <CustomMarker
                    key={pinId}
                    lat={coordinates[1]}
                    long={coordinates[0]}
                    userImage={imageUrl}
                />
            );
        });
    }

    return (
        <>
            <ReactMapGL
                height={'100%'}
                width={'100%'}
                mapStyle={`mapbox://styles/mapbox/streets-v11`}
                mapboxApiAccessToken={mapboxAPIAccessToken}
                latitude={mapViewport.latitude}
                longitude={mapViewport.longitude}
                zoom={mapViewport.zoom}
                onViewportChange={handleMapViewportChange}
            >
                <NavigationControlContainer>
                    <NavigationControl
                        onViewportChange={handleMapViewportChange}
                    />
                </NavigationControlContainer>
                {myPosition && (
                    <CustomMarker
                        lat={myPosition.latitude}
                        long={myPosition.longitude}
                        userImage={profile.image.url}
                    />
                )}
                {renderMemberMarkers()}
            </ReactMapGL>
        </>
    );
};

export default CustomMap;
