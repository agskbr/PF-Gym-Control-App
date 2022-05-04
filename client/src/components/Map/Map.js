import React, { useState } from 'react';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'

const containerStyle = {
    height: '300px'
};
const center = {
    lat:-34.82206424345692,
    lng: -58.46205190252719
};
 
const Map = (props)=> {
    const {isLoaded} = useJsApiLoader({
        id:'google-map-script',
        googleMapsApiKey: 'AIzaSyCqgQodfgNLQwdC3fqyT6MO3unxZgzr78c'
    })

    const [map, setMap] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, []);
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
            onLoad={onLoad}
            onUnmount={onUnmount}
        />
    ): <></>
}
export default Map;