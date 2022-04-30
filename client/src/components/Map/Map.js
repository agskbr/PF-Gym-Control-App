import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps';

const Map = (props)=> {
    return (
        <GoogleMap
            defaultZoom={18}  // 
            defaultCenter={{ lat:-34.821920882742745, lng: -58.45965119436606}}
        />
    )
}
export default withScriptjs(
    withGoogleMap(
        Map
    )
)