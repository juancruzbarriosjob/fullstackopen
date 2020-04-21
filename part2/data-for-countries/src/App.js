import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState('')

  const countriesToShow
    = filterCountries === '' 
    ? countries 
    : countries.filter(country => country.name.toLowerCase().includes(filterCountries))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterCountries = (event) => setFilterCountries(event.target.value.toLowerCase())

  return (
    <div>
      <div>
        Find countries <input onChange={handleFilterCountries}/>
      </div>
      <div>
        <Countries countries={countriesToShow} />
      </div>
    </div>
  );
}

export default App;

