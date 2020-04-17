import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const personsToShow = filterPerson === '' ? persons : persons.filter(person => person.name.includes(filterPerson))

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