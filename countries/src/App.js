import axios from 'axios'
import CountryEntry from './components/CountryEntry'
import CountryInfo from './components/CountryInfo'
import { useState, useEffect } from 'react'

const Filter = ({ value, onChange }) => 
  <div>
    find countries <input value={value} onChange={event => onChange(event.target.value)}/>
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