import React, {useState} from 'react';
import MapGL, {Marker, GeolocateControl} from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'

// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function Map(props) {
    // const [value, setValue] = useState(props.word);
    // const [lat, setLat] = useState(props.latitude)
    // const [long, setLong] = useState(props.latitude)
    const { longitude, latitude, word, transcript, speak, globalWords, colorStamp } = props;

    const [viewport, setViewport] = useState({
      latitude: latitude,
      longitude: longitude,
      zoom: 18
    });

    const style = {
      padding: '10px',
      color: `hsl(${colorStamp}, 50%, 50%)` ,
      cursor: 'pointer',
      // textIndent: '50px',
      // textAlign: 'justify',
      fontSize: '100px',
      zIndex: 99,
      // background: `hsl(100, 50%, 3%)`,
      
      // '#1978c8',
      // borderRadius: '26px'
    };
    
    const styleGlobalWords = {
      padding: '10px',
      // color: `hsl(${colorStamp}, 50%, 50%)` ,
      fontSize: '26px',
      borderRadius: '6px'
    };


    const showMe = () => {
      console.log(globalWords)
    }
    
    // console.log(JSON.stringify(globalWords))
return(

  <MapGL
    style={{ width: '100%', height: '100vh' }}
    mapStyle='mapbox://styles/totallywayne/ckl8guz6k2ld017o6ds9garw0'
    accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    latitude={latitude}
    longitude={longitude}
    zoom={viewport.zoom}
    onViewportChange={setViewport}
  >
   <GeolocateControl position='bottom-right' />

   {
       globalWords.map((word) => {
         {/* console.log(word) */}
         return(
                <Marker 
                        key={word.key}
                        latitude={word.latitude} 
                        longitude={word.longitude}                     
                     >
                      <div className="markTypo" style={{
                              textAlign: 'justify',
                              padding: '10px',
                              // background: '#3b3b3b',
                              color: `hsl(${word.textColor}, 80%, 50%)` ,
                              fontSize: '36px',
                              zIndex: 10,
                              borderRadius: '6px'
                      }}>
                        {word.words}
                        zIndex: 99,
                      </div>
                </Marker>   
        )
        }
        )}

    <Marker
    longitude={longitude ? longitude : -1 }
    latitude={latitude ? latitude : -1}
    // onDragEnd={onDragEnd}
    onClick={showMe}
    // draggable
  >
    {
      longitude === -1 ? 
    (
      <div className="markTypo" style={style}>Loading....</div>
    ):(
      <div className="markTypo" style={style}>{speak ? transcript : word} </div>
    )

    }
{/* 👋 */}
  </Marker>
  </MapGL>
  );
}
