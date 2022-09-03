import axios from 'axios'
import { useState, useEffect } from 'react'

const WeatherInfo = ({ latitude, longitude }) => {
    const [ weather, setWeather ] = useState()
  
    useEffect(() => {
      const key = process.env.REACT_APP_API_KEY;
  
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`)
        .then(response => setWeather(response.data))
    }, [])
  
    if (!weather)
      return (<p>loading weather data...</p>)
  
    return (
      <div>
        <p>temperature {weather.main.temp}° Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }

export default WeatherInfo