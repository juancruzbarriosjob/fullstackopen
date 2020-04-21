import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
      .then((response) => {
        setWeather(response.data)
      })
  }, [capital])

  if (!weather) {
    return (<div></div>)
  }  

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>
        <b>temperature:</b> {weather.current.temperature} Celcius
      </div>
      <div>
        <img src={weather.current.weather_icons[0]} />
      </div>
      <div>
        <b>wind:</b> {weather.current.wind_speed} MPH direction {weather.current.wind_dir}
      </div>
    </div>
  )
}

export default Weather