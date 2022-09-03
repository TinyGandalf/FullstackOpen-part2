import axios from 'axios'
import { useState, useEffect } from 'react'

const Filter = ({ value, onChange }) => 
  <div>
    find countries <input value={value} onChange={event => onChange(event.target.value)}/>
  </div>

const CountryEntry = ({ country }) => {
  const [ showInfo, setShowInfo ] = useState(false)

  return (
    <div>
      <p>
        {country.name.official}
        <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide' : 'show'}</button>
      </p>
      {showInfo &&
        <CountryInfo country={country} />
      }
    </div>
  )
}

const CountryInfo = ({ country }) => 
  <div>
    <h1>{country.name.official}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>

    <h2>languages:</h2>
    <ul>
      {Object.entries(country.languages).map(language => 
        <li key={language[0]}>{language[1]}</li>
      )}
    </ul>

    <img src={country.flags.png} alt={`${country.demonyms.eng.m} flag`} />

    <h2>Weather in {country.name.common}</h2>
    <WeatherInfo latitude={country.latlng[0]} longitude={country.latlng[1]} />
  </div>

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

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const matchingCountries = countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter value={filter} onChange={setFilter} />

      {matchingCountries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : matchingCountries.length > 1
          ? matchingCountries.map(country => <CountryEntry key={country.cca2} country={country} />)
          : matchingCountries.length === 1
            ? <CountryInfo country={matchingCountries[0]} />
            : <p>No matches</p>
      }
    </div>
  )
}

export default App