import React from 'react';
import Weather from './Wheater';

const CountryInfo = ({country, show}) => {
  if (!show) {
    return (<div></div>)
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((lang) =>
          <li key={lang.name}>{lang.name}</li>
        )}
      </ul>
      <img src={country.flag} width="100" height="100" />
      <Weather capital={country.capital} />
    </div>
  )
}

export default CountryInfo