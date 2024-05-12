import React, { useState } from 'react';
import { Button, Typography, TextField, Box, Divider } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import theme from "./customTheme";
import startLogo from "./startLogo.png";

const useStyles = makeStyles(() => ({
  root:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    background: "linear-gradient(to bottom, #0069b1, #98fb98)",
    fontFamily: "Roboto, sans-serif",
  },
  window: {
    backgroundColor:"rgba(240, 240, 240, 0.8)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginBottom: theme.spacing(2),
    backdropFilter: "blur(10px)",
  },
  header:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
    position: "relative",
    overflow: "visible"
  },
  logo:{
    width:150,
    height:150,
    borderRadius: "50%",
    position: "absolute",
    top: "-20px",
    marginTop: "-100px",
  },
  divider:{
    width: "100%",
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.customColor.main,
  },
  title:{
    fontWeight:"bold",
    marginBottom: theme.spacing(2),
  },
  subtitle:{
    marginBottom: theme.spacing(4),
  },
  input:{
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  inputContainer:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputLabel: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(-2),
    minWidth: "65px",
  },
    // Media query for smaller screens
  '@media (max-width: 768px)': {
    window: {
      width: "85%", // Adjust width for smaller screens
    },
    logo: {
      marginTop: "-100px", // Adjust logo position for smaller screens
    },
  },
}));

const UserInputDays = ({ onDaysSubmit }) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysArray = [];
    for(let date = start; date <= end; date.setDate(date.getDate()+1)){
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()
        + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      daysArray.push(formattedDate);
    }
    onDaysSubmit(daysArray);
  };  

  return (
    <div className={classes.root}>
      <Box className={classes.window}>
        <div className ={classes.header}>
          <img src={startLogo} alt="Start Logo" className={classes.logo}/>
        </div>
        <Divider className={classes.divider}/>
        <Typography variant="h5" className={classes.title} style={{fontFamily: "Merriweather"}}>
          Plan your trip by the day with Discover_Pz
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle} style={{fontFamily: "Merriweather"}}>
          Find popular places in Pazardzhik region for sightseeing, food and drinks.
          <br />
          Daily planner with live weather information.
          <br />
          Drag and drop places from your bucket list to the planner.
        </Typography>
        <div className={classes.inputContainer}>
          <div className={classes.inputLabel} style={{fontFamily: "Merriweather"}}>Start Date</div>
          <TextField
            type="date"
            variant="outlined"
            className={classes.input}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.inputLabel} style={{fontFamily: "Merriweather"}}>End Date</div>
          <TextField
            type="date"
            variant="outlined"
            className={classes.input}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Button
            variant="contained"
            style={{backgroundColor: theme.palette.customColor.main, maxWidth: '320px', width: '100%', fontFamily: "Merriweather" }}
            onClick={handleSubmit}
          >
            Let the journey begin!
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default UserInputDays;