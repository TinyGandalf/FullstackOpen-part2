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
  </div>

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