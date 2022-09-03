import WeatherInfo from './WeatherInfo'

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

export default CountryInfo