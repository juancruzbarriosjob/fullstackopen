import React from 'react'

const Filter = ({filterPerson, eventHandler}) => {
  return (
    <div>
      filter shown with 
      <input value={filterPerson} onChange={eventHandler}/>
    </div>
  )
}

export default Filter