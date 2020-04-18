import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const personsToShow = filterPerson === '' ? persons : persons.filter(person => person.name.includes(filterPerson))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addNumber = (event) => {
    event.preventDefault()

    const personExists = () => {
      return persons.some((person) => person.name === newName)
    }

    if (!personExists()) {
      const numberObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(numberObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  }

  const handleNameChange = (event) =>setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterPersonChange = (event) => setFilterPerson(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPerson={filterPerson} eventHandler={handleFilterPersonChange} />
      
      <h2>Add a new</h2>
      <PersonForm 
        submit={addNumber}
        newName={newName}
        newNumber={newNumber}
        eventHandlerName={handleNameChange}
        eventHandlerNumber={handleNumberChange}/>
  
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App