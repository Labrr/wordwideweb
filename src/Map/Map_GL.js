import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import ReactMapGL, {Source, GeolocateControl,  Layer, Feature, Marker } from 'react-map-gl';
import './Map.css'
// import ReactMapGL,{ GeolocateControl } from '@urbica/react-map-gl';



export default function Map(props) {
    const [value, setValue] = useState(props.word);
    const [lat, setLat] = useState(props.latitude)
    const [long, setLong] = useState(props.latitude)
    const { longitude, latitude, word } = props;


    // This will launch only if propName value has chaged.
    useEffect(() => { 
      setValue(props.word) 
      setLat(props.latitude) 
      setLong(props.longitude) 

    }, [props.word, props.latitude, props.longitude]);

  console.log(props)
  const [viewport, setViewport] = useState({
        // width: 400,
    // height: 400,
    latitude: 53.55225309999999, 
    longitude: 10.0606259,
    zoom: 10
  });


  return (
    <div>
      {/* <h1>{value}</h1> */}
    
    <ReactMapGL
      {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {/* <SomeMarker word={wordState} /> */}
     <div className="MarkerToSet">
     {console.log(value)}
     <GeolocateControl position='top-right' />

     {/* {value && ( */}
          <Marker
            key={value}
            latitude={props.latitude}
            longitude={props.longitude}
          >
            <h3>{value}</h3>
          </Marker>
        {/* )} */}

     </div>      
    </ReactMapGL>
    </div>
  );
}
