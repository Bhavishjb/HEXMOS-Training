import React from 'react';
import { Button } from '@mui/material';
import './Home.css'
import {useNavigate} from "react-router-dom"
import './CreatePoll.css'

//function for the medium size button (used for vote on this poll ,add option and filter by tags button's)
export const MBtn = ({ onClick, label }) => {
  return (
    <div style={{ margin: '10px' }}>
      <Button
        onClick={onClick}
        style={{
          height: '33px',
          width: '120x',
          border: '1px solid black',
          backgroundColor: 'gainsboro',
          color:'black'
        }}
      >
        {label}
      </Button>
    </div>
  );
};

//function for the Large size button (used for Create Poll Button's)
export const LBtn = ({ onClick, label }) => {
  return (
    <div className="createPollButton" style={{ margin: '10px' }}>
      <Button
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  );
};
//function for the small size button (used for Vote and Home Button's)
export const SBtn = ({ onClick, label }) => {
  return (
    <div style={{ margin: '0px' }}>
      <Button
        onClick={onClick}
        style={{
          height: '35px',
          width: '75px',
          border: '1px solid black',
          backgroundColor: 'grey',
          color:'white'
        }}
      >
        {label}
      </Button>
    </div>
  );
};

