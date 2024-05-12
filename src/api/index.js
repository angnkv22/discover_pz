
import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
        , {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                "X-RapidAPI-Key": 'f24cc82c86mshe290b5789720d2bp1ecb49jsna078460f972c',
                "X-RapidAPI-Host": 'travel-advisor.p.rapidapi.com'
            }
        });

        return data;

    } catch(error){
        console.log(error)

    }
}

// Function to fetch weather data from the weather API
export const fetchWeatherData = async (lat, lng) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=a4c70bb077dc0a21fb409180838881b1`);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}