import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: theme.spacing(3),
    borderRadius: '8px',
    boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.2)',
    textAlign: 'center',
    zIndex: 9999,
  },
  // Add styles for the blurred background
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    zIndex: 9998, // Set the z-index lower than the message container
    backdropFilter: 'blur(3px)', // Apply the blur effect
  },
}));

const CustomMessage = ({ message, onClose }) => {
  const classes = useStyles();

  return (
    <>
      {/* Render the backdrop */}
      <div className={classes.backdrop}></div>
      {/* Render the message container */}
      <div className={classes.messageContainer}>
        <Typography variant="h6" gutterBottom>
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose}>
          OK
        </Button>
      </div>
    </>
  );
};

export default CustomMessage;
