import { React, useState, useEffect } from 'react'
import './App.css'
import { baseUrl, getRequest } from './utils/services';

function App() {
  const [weather, setWeather] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [latitude, setLatitude] = useState(45);
  const [longitude, setLongitude] = useState(73);
  const [submit, setSubmit] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      let data = await getRequest(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`);

      if (data.error) {
        return console.log("Error getting weather", data);
      }

      setWeather(data);
    }
    getWeather();
  }, [submit])

  const handleSwitchUnit = () => {
    setIsCelsius(!isCelsius);
  }
  const handleLatitudeChange = (event)  => {
    setLatitude(event.target.value)
  }
  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value)
  }
  const handleSubmit = () => {
    setSubmit(!submit);
  }

  return (
    <>
      <div className="square">
        <div className="search-container">
          <h3>Latitude: {latitude}</h3>
          <input value={latitude} onChange={handleLatitudeChange}/>
          <h3>Longitude: {longitude}</h3>
          <input value={longitude} onChange={handleLongitudeChange}/>
          <button onClick={handleSubmit}>submit</button>
        </div>
        <h2 className='cityName'>{weather?.name}</h2>
        <div className="img-cover">
          <img src={weather?.weather[0]?.icon} alt="Weather Image"/>
        </div>
        <div className="temp-container">
          <h1>{isCelsius ? weather?.main?.temp.toFixed(1) + '°C' : (weather?.main?.temp * 1.8 + 32).toFixed(1) + '°F'}</h1>
          <button onClick={handleSwitchUnit}>{isCelsius ? "Convert to °F" : "Convert to °C"}</button>
        </div>
        <div className="extra-container">
          <h5>Wind:  {weather?.wind?.speed} km/h with gust up to {weather?.wind?.gust} km/h</h5>
          <h5>Sunrise:  {new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h5>
          <h5>Sunset:  {new Date(weather?.sys?.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h5>
        </div>
      </div>
    </>
  )
}

export default App
