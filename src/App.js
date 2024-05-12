import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, fetchWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import UserInputDays from './components/UserInputDays';
import DailyPlanner from './components/DailyPlanner';
import BucketList from './components/BucketList';
import CustomMessage from './components/customMessage';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const initialCoords = {lat: 42.19231570497648, lng: 24.330854931585254};

  // Define a new state to manage daily plans
  const [dailyPlans, setDailyPlans] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  const handleDropPlace = (place, dayIndex) => {
    if (!place || !place.id) {
      // Handle error: Invalid drop
      console.error("Invalid drop");
      return;
    }
    if (dailyPlans[dayIndex].places.find(p => p.id === place.id)) {
      // Handle error: Duplicate drop
      console.error("Duplicate drop");
      return;
    }
    // Remove dropped place from BucketList
    setBucketList(prevList => prevList.filter(item => item.id !== place.id));
    // Update the dailyPlans state by adding the dropped place to the specified day
    setDailyPlans((prevPlans) => {
      const updatedPlans = [...prevPlans];
      updatedPlans[dayIndex].places.push(place);
      return updatedPlans;
    });
  };  

  const handleDaysSubmit = (numberOfDays) => {
    const daysArray = numberOfDays.map((date,index)=>({
      id: index,
      date: date,
      places: [] // Initialize daily plan with an empty array of places
    }));
    setDailyPlans(daysArray);
  };
  
  const handleDragEnd = (placeId) => {
    setBucketList(prevList => prevList.filter(item => item.id !== placeId));
  };

  const handleDropFromBucketList = (place) => {
    // Add the dropped place to the first day in the dailyPlans
    const updatedPlans = [...dailyPlans];
    updatedPlans[0].places.push(place);
    setDailyPlans(updatedPlans);

    // Remove the dropped place from the bucket list
    setBucketList(prevList => prevList.filter(item => item.id !== place.id));
  };

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);

  // Fetch weather data based on coordinates
  useEffect(() => {
    if (coords.lat && coords.lng) {
      setIsWeatherLoading(true);
      // Fetch weather data using your API
      fetchWeatherData(coords.lat, coords.lng)
        .then((data) => {
          setWeatherData(data);
          setIsWeatherLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setIsWeatherLoading(false);
        });
    }
  }, [coords]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  const addToBucketList = (place, type) => {
    const isAlreadyAdded = bucketList.some(item => item.name === place.name);

    if (isAlreadyAdded) {
      // Show the custom message if the place is already in the bucket list
      setMessageContent(`${place.name} is already added to the bucket list.`);
      setIsMessageOpen(true);
    } else {
      setBucketList(prevList => [...prevList, { name: place.name, address: place.address, type}]);
    }
  };

  return (
    <>
      <CssBaseline />
      {!dailyPlans || dailyPlans.length === 0 ? (
        <UserInputDays onDaysSubmit={handleDaysSubmit} />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            </Grid>
            <Grid item xs={12} md={3}>
              <BucketList
                bucketList={bucketList}
                onDropFromBucketList={handleDropFromBucketList}
              />
              <div style={{ overflowY: dailyPlans.length > 2 ? 'scroll' : 'hidden',overflowX: 'hidden', marginTop:"25px", maxHeight: 'calc(100vh - 400px)', position: 'relative' }}>
                {dailyPlans && dailyPlans.length > 0 && (
                  <DailyPlanner dailyPlans={dailyPlans} onDropPlace={handleDropPlace} onDragEnd={handleDragEnd}/>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <Map
                setChildClicked={setChildClicked}
                setBounds={setBounds}
                setCoords={setCoords}
                coords={initialCoords}
                places={filteredPlaces.length ? filteredPlaces : places}
                weatherData={weatherData}
                isWeatherLoading={isWeatherLoading}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <List
                isLoading={isLoading}
                childClicked={childClicked}
                places={filteredPlaces.length ? filteredPlaces : places}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                addToBucketList={addToBucketList}
              />
            </Grid>
          </Grid>
          {isMessageOpen && <CustomMessage message={messageContent} onClose={() => setIsMessageOpen(false)} />}
        </>
      )}
    </>
  );
};

export default App;
