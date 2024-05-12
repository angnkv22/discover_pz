import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles.js';
import theme from "../customTheme";
import logo from "../startLogo.png";

const Header = ({ onPlaceChanged, onLoad }) => {
    
  const classes = useStyles();

  return (
    <AppBar position="static" style={{background: "#c7dbe2"}}>
      <Toolbar className={classes.toolbar} >
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src={logo} alt="Logo" className={classes.logo}/>
          <Typography variant = "h5" className={classes.title}>
          Discover Pazardzhik Region
          </Typography>
        </Box>
        <Box display="flex" >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search new places..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;