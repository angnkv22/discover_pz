import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherIcon from './weatherIcons/WeatherIcon';
import './weatherIcons/WeatherIcon.css';

/* Import your weather icons
import cloudWeather from '../weatherPanel/weatherIcons/cloudWeather.png';
import defaultWeather from '../weatherPanel/weatherIcons/defaultWeather.png';
import rainWeather from '../weatherPanel/weatherIcons/rainWeather.png';
import snowWeather from '../weatherPanel/weatherIcons/snowWeather.png';
import sunWeather from '../weatherPanel/weatherIcons/sunWeather.png';

const cloudIcon = <ReactImageResize src={cloudWeather} width={64} height={64} />;
const defaultIcon = <ReactImageResize src={defaultWeather} width={64} height={64} />;
const rainIcon = <ReactImageResize src={rainWeather} width={64} height={64} />;
const snowIcon = <ReactImageResize src={snowWeather} width={64} height={64} />;
const sunIcon = <ReactImageResize src={sunWeather} width={64} height={64} />; 

const WeatherIcon = ({ weatherCondition }) => {
    // Function to select the appropriate weather icon based on the weather condition
    const getWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case 'Clear':
                return sunWeather;
            case 'Rain':
                return rainWeather;
            case 'Clouds':
                return cloudWeather;
            case 'Snow':
                return snowWeather;        
            default:
                return defaultWeather; // Return null if the weather condition is not recognized
        }
    }; 

    return (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
            <img src = {getWeatherIcon(weatherCondition)} alt = "Weather Icon" style = {{width:64, height: 64}} />
        </div>
    );
};

*/

const WeatherPanel = ({ mapBounds }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data when mapBounds change
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: mapBounds.lat,
            lon: mapBounds.lng,
            appid: 'a4c70bb077dc0a21fb409180838881b1',
            units: 'metric',
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [mapBounds]);

  return (
    <div className="weather-panel" style ={{padding: "10px", border: "1px solid #ccc", borderRadius:"5px"}}>
      {weatherData && (
        <div>
          <div className='weather-info'>
            <WeatherIcon weatherCondition={weatherData.weather[0].main} />
            <div>
              <h3>Weather in the region:</h3>
              <p>Temperature: {Math.floor(weatherData.main.temp)}°C</p>
              <p>Description: {weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WeatherPanel;
