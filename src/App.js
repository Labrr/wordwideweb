
import Nav from 'react-bootstrap/Nav'

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
// import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
// import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import Modal from './Modal/SimpleModal';

import './App.css';

// import pointsBaseService from './services/PointsBaseService';

import { useEffect, useState} from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { usePosition } from './CustomHooks/usePosition'

import PointsBaseService from './services/PointsBaseService'


import Map from './Map/Map'
// import { RecordVoiceOverSharp } from '@material-ui/icons';




const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const watch = true;
   
  const {
    latitude,
    longitude,
    speed,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch);


  const [globalWords, setGlobalWords] = useState([]);

  const onDataChange = (items) => {
    let globalWords = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      globalWords.push({
        key: key,
        words:  data.words,
        latitude: data.latitude,
        longitude: data.longitude,
        textColor: data.textColor,
        timestamp: data.timestamp
      });
    });
    console.log(globalWords)

    setGlobalWords(globalWords);
  };
  

  const initialWordGeo = {
    words: "Type it into the World...",
    latitude: -1,
    longitude: -1
  }

  // const initialColorStamp = mapColor(Math.floor(Date.now() % 1000), 0, 999, 0, 255);

  const { transcript, resetTranscript  } = useSpeechRecognition();
  const [speak, setSpeak] = useState(true) 
  const [word, setWord] = useState(initialWordGeo)
  const [submitted, setSubmitted] = useState(false);
  const [textColor, setTextColor] = useState(50)
  const [record, setRecord] = useState(false)
  const [seconds, setSeconds] = useState(10);

  var [browserSupp, setBrowserSupp] = useState(-1);

  // useEffect(
  //   () => {
  //       const timer =
  //       record && seconds >= 0 && setInterval(() => setSeconds(seconds => seconds - 1), 1000);
  //       return () => {
  //       clearInterval(timer);
        
  //     }
  //     if(seconds >= 0){
  //       setRecord(false);
  //       setSeconds(10)
  //     }

  // }, [seconds]);
  // "Hmm, your browser is not supported! Only Chrome supports Speech Recognition..."

  useEffect(() => {
      /**
       * Browser support
       */
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      // blank out 
      setBrowserSupp(2);
    }else{
      setBrowserSupp(1);
    }
    
    PointsBaseService.getAll().on("value", onDataChange);

    const interval = setInterval(() => setTextColor(mapColor(Math.floor(Date.now() % 1000), 0, 999, 0, 300)), 950);

    return () => {
      PointsBaseService.getAll().off("value", onDataChange);
      clearInterval(interval);
      // clearInterval(recordInterval);
    };

  }, [record]);


  /**
   * Timestamp auf Farbe mappen
   */

  const mapColor = (value, x1, y1, x2, y2) => {
    return Math.floor(((value - x1) * (y2 - x2)) / (y1 - x1) + x2);
  } 


  const saveBlabla = () => {
    // if(word.words !== "" || transcript )
    var data = {
      words: speak ? transcript : word.words,
      latitude: latitude,
      longitude: longitude,
      textColor: textColor,
      timestamp: Date.now()
    }
  

    PointsBaseService.create(data)
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
    resetTranscript();
  }
    
  const onChangeHandler = event => {
    setWord({
      words: event.target.value
      }
    );
    
  };
  
  const speakOrWrite = () => {
    setSpeak(!speak);
  }

  
  const handleRecord = () => {
    setRecord(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true })
  }

  const handleRecordStop = () => {
      setRecord(false);
      SpeechRecognition.stopListening();
  }
  
  return (
    <div className="wordwide">
      {/* <header className="App-header"> */}
      
      <Modal browserSupp={browserSupp} />

      <div className="menu">
    
      {/* <div className="GUI">
      <div className="longLat">
          {latitude && longitude ? (
            <code>
              Latitude: {latitude}, Longitude: {longitude}
            </code>
          ) : (
            <p>Loading...</p>
          )}
          {error && <p>Location Error: {error}</p>}
        </div>
        </div> */}



       <Button color="primary" onClick={ speakOrWrite }>{speak ? "Speak" : "Write"} </Button>

        <div className="submit-form">
            {submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <Button onClick={newWords}>
                  Add
            </Button>
              </div>
            ) : (
              <div className="InputType"> 
            {speak ? (
              <div className="InputSpeech">
                <div className="actionButtonContainer">
                 
                {record ? 
                  (<Fab color="secondary" className="speechButton" onClick={ handleRecordStop
                    //  () => SpeechRecognition.startListening({ continuous: true })
                  }>Stop</Fab>):(
                    <Fab color="primary" className="speechButton" onClick={ handleRecord 
                    }>Start</Fab>
                  )                
                }
              

                

                </div>
                
                {/* <Button onClick={  () => SpeechRecognition.startListening({ continuous: true })
                }>listen you ...</Button>

    */}
                {/* <Button onClick={SpeechRecognition.stopListening}>Stop Listening</Button>  */}
                <Button className="submitButton" onClick={saveBlabla}>Submit</Button>
                </div>
            ):(
              <div className="textForm">
              
      
                <TextField 
                  // id="standard-basic"
                  noValidate autoComplete="off"
                  type="text"
                  className="formControl"
                  id="wordInput"
                  required
                  value={word.words}
                  onChange={onChangeHandler}
                  name="wordInput"
                  placeholder="tell the World"
                />
             

                <Button className="submitButton" onClick={saveBlabla}>Submit</Button>
              </div>
            )
            }
            </div>
            
            )}
         </div>

      </div>
     
          <Map
          className="mapStyle" 
          colorStamp={textColor}
          speak={speak}
          globalWords={globalWords? globalWords : -1}
          word={word.words}
          transcript={ transcript ? transcript : 'Shout it into the World...'}    
          latitude= {latitude ? latitude : -1}
          longitude= {longitude ? longitude : -1}

          />

    </div>
  );
}

export default App;
