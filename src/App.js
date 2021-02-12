import './App.css';

import pointsBaseService from './services/PointsBaseService';

import { useEffect, useState} from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { usePosition } from './CustomHooks/usePosition'

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



import Map from './Map/Map'



function App() {

  const watch = true;
  const {
    latitude,
    longitude,
    speed,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch);


  const initialWordGeo = {
    words: "Talk",
    latitude: -1,
    longitude: -1
  }

  const { transcript } = useSpeechRecognition();

  // const { location, error } = useCurrentLocation(geoOptions)
  
  // const [ error, setError ] = useState();

  // const [blabla, setBlabla] = useState(initialBlabla)

  

  const [speak, setSpeak] = useState(true) 

  const [word, setWord] = useState(initialWordGeo)

  const [submitted, setSubmitted] = useState(false);


  /**
   * Browser support
   */

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Ups, your browser is not supported!");
    }  
  }, []);


  const saveBlabla = () => {

    var data = {
      words: transcript ? transcript : word.words,
      latitude: latitude,
      longitude: longitude,
    }
  

    pointsBaseService.create(data)
    .then(() => {
      console.log("db upd")
      setSubmitted(true);
    })
    .catch(err => {
      console.log(err)
    })
  }

  /**
   * set status to initial -> Eingabe neuer Wörter
   */

  const newWords = () => {
    setWord(initialWordGeo)
    setSubmitted(false)
  }
 

  const onChangeHandler = event => {
    setWord({
      words: event.target.value
    });

  };

 
  const speakOrWrite = () => {
    setSpeak(!speak);
  }
  console.log();

  return (
    <div className="App">
      <header className="App-header">

      <Map 
          speak={speak}
          word={word.words}
          transcript={ transcript ? transcript : 'Start listening...'}    
          // location={location ? location : -1} 
          latitude= {latitude ? latitude : -1}
          longitude= {longitude ? longitude : -1}
          
          />
        

    {/* <div className="GUI">
      <div className="longLat">
          {location ? (
            <code>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </code>
          ) : (
            <p>Loading...</p>
          )}
          {error && <p>Location Error: {error}</p>}
        </div> */}

        <Navbar sticky="bottom" bg="dark" variant="dark">
        {/* <Container> */}
        <Row>
    {/* <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col> */}


        {/* <Nav.Item> */}
        <Col>
          <Button onClick={ speakOrWrite }>{speak ? "Speak" : "Write"} </Button>
        </Col>
        {/* </Nav.Item> */}
        <Col>

        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button onClick={newWords}>
                Add
           </button>
            </div>
          ) : (
            <div className="InputType"> 
           {speak ? (
             <div className="InputSpeech">
                          <p>{ transcript ? transcript : 'Start listening...'}</p>

              <button onClick={  () => SpeechRecognition.startListening({ continuous: true })
              }>listen you ...</button>

              &nbsp;

              <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
              <button onClick={saveBlabla}>Submit</button>
              </div>
           ):(
            <div className="formBlabla">
            
            <label htmlFor="wordInput">Write</label>
              <input
                type="text"
                className="form-control"
                id="wordInput"
                required
                value={word.words}
                onChange={onChangeHandler}
                name="wordInput"
                placeholder="tell the World"
              />
              <h1>Write</h1>

              <button onClick={saveBlabla}>Submit</button>

            </div>
           )
           }
           </div>
           
          )}
            </div>
           </Col>
           </Row>
            {/* 20sec timer für sprache - oder 10 */}

            {/* todo - nach vielen blablas - you talk to much 30sec silence */}

            {/* todo - farbe auf lat lng time -> map 0-255 abstimmen  */}
            {/* </Container> */}
           </Navbar>
      {/* </div>         */}
      </header>
    </div>
  );
}

export default App;
