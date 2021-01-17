import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, { ViewportProps, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FamilyContext } from '../../contexts/family.context';
import Screen from '../../components/ScreenComponents/Screen';
import CreateFamilyOnboarder from '../../components/Onboarding/CreateFamilyOnboarder';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { LocateScreenContent, NavigationControlContainer } from './style';

const mapboxAPIAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

interface MapViewport {
    latitude: number;
    longitude: number;
    zoom: number;
}

const INITIAL_VIEWPORT: MapViewport = {
    latitude: 50,
    longitude: 24,
    zoom: 1,
};

const LocateScreen: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);
     const [mapViewport, setMapViewport] = useState<MapViewport>(INITIAL_VIEWPORT);

    const handleMapViewportChange = (viewport: ViewportProps) => {
        setMapViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: viewport.zoom,
        });
    }

    useEffect(() => {
        document.title = `Locate | Familia`;
    }, []);


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
                </ReactMapGL>
            </LocateScreenContent>
        </Screen>
    );
};

export default LocateScreen;