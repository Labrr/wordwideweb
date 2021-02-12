import React, {useState} from 'react';
import MapGL, {Marker, GeolocateControl} from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


export default function Map(props) {
    // const [value, setValue] = useState(props.word);
    // const [lat, setLat] = useState(props.latitude)
    // const [long, setLong] = useState(props.latitude)
    const { longitude, latitude, word, transcript, speak } = props;

    const [viewport, setViewport] = useState({
      latitude: 53,
      longitude: 9,
      zoom: 5
    });

    const style = {
      padding: '10px',
      color: '#fff',
      cursor: 'pointer',
      background: '#1978c8',
      borderRadius: '6px'
    };
    const showMe = () => {
      console.log(transcript)
      console.log(props)
    }

return(

  <MapGL
    style={{ width: '100%', height: '100vh' }}
    mapStyle='mapbox://styles/mapbox/dark-v9'
    accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    latitude={viewport.latitude}
    longitude={viewport.longitude}
    zoom={viewport.zoom}
    onViewportChange={setViewport}
  >
   <GeolocateControl position='top-right' />
    <Marker

    longitude={longitude ? longitude : -1 }
    latitude={latitude ? latitude : -1}
    // onDragEnd={onDragEnd}
    onClick={showMe}
    // draggable
  >
    <div style={style}>{speak ? transcript : word} 👋</div>
  </Marker>
  </MapGL>

  

  );
}
