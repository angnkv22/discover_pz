import React from 'react';
import ReactImageResize from 'react-image-resizer';
import './WeatherIcon.css';

/* Import your weather icons
import cloudWeather from './cloudWeather.png';
import defaultWeather from './defaultWeather.png';
import rainWeather from './rainWeather.png';
import snowWeather from './snowWeather.png';
import sunWeather from './sunWeather.png'; */

const WeatherIcon = ({ weatherCondition }) => {
    // Function to select the appropriate weather icon based on the weather condition
    const getWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case 'Clear':
                return 'sun';
            case 'Rain':
                return 'rain';
            case 'Clouds':
                return 'cloud';
            case 'Snow':
                return 'snow';        
            default:
                return 'default'; // Return null if the weather condition is not recognized
        }
    };

    return (
        <div className={`weather-icon weather-icon-${getWeatherIcon(weatherCondition)}`} />
      );
    };
    
export default WeatherIcon;
