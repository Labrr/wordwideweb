import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import './Modal.css';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    textSize: '16px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();

  const {browserSupp} = props;

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  useEffect(() => {
      setOpen(true);
      return () => {
        setOpen(false);
      }
  }, [])


//   const handleOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h1 className="modalTitle">WordWide[Web]</h1>
    
      <p id="simple-modal-description">
        Welcome! Klick on the Start Button and talk to your phone [weird] Your Words will be translated into text and appear on the map.
      </p>
      <span>Click the START button again [which says STOP now] to end the Speech Recognition. </span>
      <br />
      <p>If you are satisfied with your result click on SUBMIT so everybody can see!</p>
      <br />
      <p>
          If you can not use Speechrecognition then just click on the button to your left [on the screen] that says WRITE
      </p>

      <Button type="button" onClick={handleClose}>close
      </Button>

      <hr />
      {browserSupp <= 0 ?  
        (<span id="simple-modal-description">Getting Browser Data...</span>):(
            <div>
            {browserSupp === 1 ?  (<span id="simple-modal-description">Yess you can use Speech recognition! Have Fun! </span>):(
                    <span id="simple-modal-description">Damn, you need to use Chrome Browser for Speech regonition...or you type it :) </span>
                )
            }
            </div>
        )
      }
      
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}