import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/personsService'

const messageAlreadyExists = 'is already added to phonebook, replace the old number with a new one'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [error, setError] = useState(false)

  const personsToShow = filterPerson === '' 
    ? persons 
    : persons.filter(person => person.name.includes(filterPerson))

  useEffect(() => {
    personsService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  const addNumber = (event) => {
    event.preventDefault()

    const personExists = () => {
      return persons.some((person) => person.name === newName)
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (!personExists()) {
      personsService
        .add(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Added ${returnedPerson.name}`)
            setError(false);
          })
    } else {
      if (window.confirm(`${newName} ${messageAlreadyExists}`)) {
        const personUpdated = persons.filter(person => person.name === newName)[0]
        personsService
          .update(personUpdated.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map((person) => {
              return person.id !== personUpdated.id
                ? person
                : returnedPerson
            }))
          })
      }
    }
  }

  const handleNameChange = (event) =>setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterPersonChange = (event) => setFilterPerson(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={error} />
      <Filter filterPerson={filterPerson} eventHandler={handleFilterPersonChange} />
      
      <h2>Add a new</h2>
      <PersonForm 
        submit={addNumber}
        newName={newName}
        newNumber={newNumber}
        eventHandlerName={handleNameChange}
        eventHandlerNumber={handleNumberChange}/>
  
      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow} 
        setPersons={setPersons} 
        setNotificationMessage={setNotificationMessage} 
        setError={setError} />
    </div>
  )
}

export default App