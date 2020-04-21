import React, { useState } from 'react';
import Country from './Country';

const Countries = ({countries}) => {
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} show={true} />
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  return (
    <div>
      {countries.map((country) => 
        <div key={country.cioc}>
          <Country country={country} show={false} />
        </div>
      )}
    </div>
  )
}

export default Countries