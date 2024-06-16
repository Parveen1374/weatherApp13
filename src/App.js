import React, { useState, useEffect } from 'react'; // Importing necessary React hooks and libraries
import axios from 'axios'; // Importing axios for making HTTP requests
import { MdSearch } from "react-icons/md"; // Importing search icon from react-icons library
import { MdLocationOn } from "react-icons/md"; // Importing location icon from react-icons library
import { WiHumidity } from "react-icons/wi"; // Importing humidity icon from react-icons library
import { TiWeatherCloudy } from "react-icons/ti"; // Importing weather description icon from react-icons library
import { FaWind } from "react-icons/fa"; // Importing wind speed icon from react-icons library
import './App.css'; // Importing CSS file for styling

function App() {
  // State to store weather data
  const [data, setData] = useState({
    temperature: '', // Temperature in Fahrenheit
    name: null, // Name of the city
    country: '', // Country code
    humidity: '', // Humidity percentage
    windSpeed: '', // Wind speed in KM/H
    weatherDescription: '', // Weather description
    weatherIcon: '' // Weather icon code
  });

  const [error, setError] = useState(null)

  // State to manage theme (light or dark)
  const [theme, setTheme] = useState('light');

  // State to manage current time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  // State to store the location name input by the user
  const [name, setName] = useState('');

  // Function to handle search button click
  const onClickSearch = () => {
    if (name !== '') { // Check if the user has entered a location name
      // URL for the weather API with the user-inputted location and API key
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1ed2935aa83782a9b6de88e77538d7ef`;
      // Fetching weather data using axios
      axios.get(weatherApiUrl)
        .then(response => {
          // Updating the data state with the fetched weather data
          setData({
            ...data, // Spread the current state
            name: response.data.name, // Update city name
            temperature: response.data.main.temp, // Update temperature
            humidity: response.data.main.humidity, // Update humidity
            windSpeed: response.data.wind.speed, // Update wind speed
            weatherDescription: response.data.weather[0].description, // Update weather description
            weatherIcon: response.data.weather[0].icon, // Update weather icon code
            country: response.data.sys.country // Update country code
          });
          console.log(response.data); // Log the response data for debugging
          setError(false)
        })
        .catch((err) => {
          console.log(err.Message); // Log any errors that occur during the request
          setError(err)
          setData('')
        });
    }
  };

  // Effect to update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString()); // Update the current time state
    }, 1000); // Set interval to 1 second
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  // Function to toggle theme between light and dark
  const onClickSetTheme = () => {
    setTheme(theme === 'light' ? "dark" : "light"); // Toggle theme state
  };

  return (
    <div className={`app-container ${theme}`}> {/* Apply theme class to container */}
      {/* Toggle for dark mode */}
      <div>
        <input type="checkbox" onChange={onClickSetTheme} name="theme" id="theme" /> {/* Checkbox to toggle theme */}
        <label htmlFor='theme' className='theme-changer'>Dark Mode</label> {/* Label for the theme toggle */}
      </div>

      <div className={`weather-container ${theme}`}> {/* Apply theme class to weather container */}
        {/* Search container for location input */}
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search Location...'
            onChange={(event) => setName(event.target.value)} // Update name state on input change
            className='user-input'
          />
          <button type='button' className='search-btn' onClick={onClickSearch}> {/* Search button */}
            <MdSearch className='search-icon' /> {/* Search icon */}
          </button>
        </div>
        {error && <p>Error : {error.message}</p>}
        {/* Main container to display weather data */}
        {data.name ? (
          <div className='main-container'>
            <h1 className='temperature'>{data.temperature}<span>&deg;F</span></h1> {/* Display temperature */}
            <div className='image-container'>
              <img
                src={`https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`} // Weather icon URL
                alt="weather"
                className='weather-img'
              />
              <div className=''>
                <p>{currentTime}</p> {/* Display current time */}
                <div className='location-container'>
                  <MdLocationOn /> {/* Location icon */}
                  <p>{data.name}, {data.country}</p> {/* Display city and country */}
                </div>
              </div>
            </div>

            {/* Card container to display additional weather information */}
            <div className={`card-container ${theme}`}> {/* Apply theme class to card container */}
              <div className='humidity'>
                <WiHumidity /> {/* Humidity icon */}
                <p>{data.humidity}%</p> {/* Display humidity */}
                <p>Humidity</p>
              </div>
              <div className='wind-speed'>
                <FaWind /> {/* Wind speed icon */}
                <p>{data.windSpeed} KM/H</p> {/* Display wind speed */}
                <p>Wind speed</p>
              </div>
              <div className='weather-description'>
                <TiWeatherCloudy /> {/* Weather description icon */}
                <p>{data.weatherDescription}</p> {/* Display weather description */}
                <p>Weather</p>
              </div>
            </div>
          </div>
        ) : (
          // Message displayed when no location is entered
          <p>Enter Location...</p>
        )}
      </div>
    </div>
  );
}

export default App; // Export the App component as the default export
