import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, { ViewportProps, NavigationControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MdLocationOn } from 'react-icons/md';
import { FamilyContext } from '../../contexts/family.context';
import Screen from '../../components/ScreenComponents/Screen';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { LocateScreenContent, NavigationControlContainer, PinIconContainer } from './style';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_LOCATION_MUTATION } from '../../graphql/location/mutations';
import { IUserLocation } from '../../models/location';

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

const LocateScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);
    const [mapViewport, setMapViewport] = useState<MapViewport>(INITIAL_VIEWPORT);
    const [myPosition, setMyPosition] = useState<Position>();
    const [updateMyLocationMutation] = useMutation<UpdateUserLocationResult>(UPDATE_USER_LOCATION_MUTATION);

    useEffect(() => {
        document.title = `Locate | Familia`;
    }, []);

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
                    latitude,
                    longitude,
                });
            });
        }
    }

    if (!loadingFamilies && families.length === 0) {
        return (
            <Screen
                title="Locate"
            >
                <CreateFamilyOnboarder />
            </Screen>
        );
    }

    return (
        <Screen
            title="Locate"
            subTitle={currentFamily?.name}
            rightComponent={<CurrentFamilyIndicator />}
        >
            <LocateScreenContent>
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
                        <Marker
                            latitude={myPosition.latitude}
                            longitude={myPosition.longitude}
                            offsetLeft={-19}
                            offsetTop={-37}
                        >
                            <PinIconContainer>
                                <MdLocationOn className='icon' />
                            </PinIconContainer>
                        </Marker>
                    )}
                </ReactMapGL>
            </LocateScreenContent>
        </Screen>
    );
};

export default LocateScreen;