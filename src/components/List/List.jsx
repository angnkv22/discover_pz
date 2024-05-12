import React, { useState } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading, addToBucketList, dailyPlans}) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    if(!dailyPlans || dailyPlans?.length === 0){
      return;
    }
    // Initialize elRefs array with refs for each place
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || React.createRef())
    );
  }, [places, dailyPlans]);
  
  if(!dailyPlans || dailyPlans?.length === 0){
    return <div>No daily plans available</div>
  }

  return (
    <div className={classes.container} >
      <Typography variant="h4" style={{fontFamily: "Merriweather"}}>Must-Visit Places</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl} style={{fontFamily: "Merriweather"}}>
            <InputLabel id="type" style={{fontFamily: "Merriweather"}}>Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)} style={{fontFamily: "Merriweather"}}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating" style={{fontFamily: "Merriweather"}}>Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} style={{fontFamily: "Merriweather"}}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid key={i} item xs={12} ref={elRefs[i]}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                  type={type}
                  addToBucketList={addToBucketList}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;