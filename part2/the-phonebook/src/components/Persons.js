import React from 'react'
import personsService from '../services/personsService'

const Persons = ({persons, setPersons}) => {
  const handleDelete = personToDelete => {
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService
        .deletePerson(personToDelete.id)
        .then(
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        )
    }
  }

  return (
    <div>
      {persons.map((person) => 
        <div key={person.name}>
          {person.name} {person.number} <button onClick={() => handleDelete(person)} >delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons