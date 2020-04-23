import React from 'react'
import personsService from '../services/personsService'

const Persons = (props) => {
  const handleDelete = personToDelete => {
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService
        .deletePerson(personToDelete.id)
        .then(
          props.setPersons(props.persons.filter(person => person.id !== personToDelete.id))
        )
        .catch(
          error => {
            props.setError(true)
            props.setNotificationMessage(
              `Information of ${personToDelete.name} has already been removed from server`
            )
            setTimeout(() => {
              props.setError(false)
              props.setNotificationMessage('')
            }, 5000)
            props.setPersons(props.persons.filter(person => person.id !== personToDelete.id))
          }
        )
    }
  }

  return (
    <div>
      {props.persons.map((person) => 
        <div key={person.name}>
          {person.name} {person.number} <button onClick={() => handleDelete(person)} >delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons