import CountryInfo from './CountryInfo'
import { useState } from 'react'

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

export default CountryEntry