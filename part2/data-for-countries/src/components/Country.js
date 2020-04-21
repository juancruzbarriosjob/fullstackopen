import React, {useState} from 'react';
import CountryInfo from './CountryInfo';

const Country = ({country, show}) => {
  const [showCountry, setShowCountry] = useState(show)

  const handleShowCountry = () => {
    setShowCountry(!showCountry)
  }

  return (
    <div>
      {country.name} <button onClick={handleShowCountry}>Show</button>
      <CountryInfo country={country} show={showCountry} />
    </div>
  )
}

export default Country