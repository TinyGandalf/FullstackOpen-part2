import './App.css'
import personsService from './services/personsService'
import { useState, useEffect } from 'react'

const Filter = ({ value, onChange }) => 
  <div>filter shown filter <input value={value} onChange={event => onChange(event.target.value)} /></div>

const Persons = ({ persons, onDelete }) => 
  <div>
    {persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number} onDelete={() => onDelete(person)} />
    )}
  </div>

const Person = ({ name, number, onDelete }) =>
  <p>
    {name} {number}
    <button onClick={onDelete}>delete</button>
  </p>

const PersonForm = ({ name, onNameChange, number, onNumberChange, onSubmit }) => 
  <form onSubmit={onSubmit}>
    <div>name: <input value={name} onChange={event => onNameChange(event.target.value)} /></div>
    <div>number: <input value={number} onChange={event => onNumberChange(event.target.value)} /></div>
    <div><button type="submit">add</button></div>
  </form>

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const errorClass = isError ? 'error' : ''

  return (
    <div className={`notification ${errorClass}`}>
      {message}
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [messageIsError, setMessageIsError] = useState(false)

  useEffect(() => { personsService.getAll().then(response => setPersons(response)) }, [])

  const handleAdded = newPerson => {
    setMessage(`${newPerson.name} was successfully added`)
    setMessageIsError(false)
    waitToHideMessage()

    setPersons(persons.concat(newPerson))
  }

  const handleChanged = (oldPerson, newPerson) => {
    setMessage(`${oldPerson.name}'s number was successfully changed`)
    setMessageIsError(false)
    waitToHideMessage()

    setPersons(persons.map(p => p.id !== oldPerson.id ? p : newPerson))
  }

  const handleDeleted = person => {
    setMessage(`${person.name}'s number was successfully deleted`)
    setMessageIsError(false)
    waitToHideMessage()

    setPersons(persons.filter(p => p.id !== person.id))
  }

  const handleError = person => {
    setMessage(`${person.name} was removed from server`)
    setMessageIsError(true)
    waitToHideMessage()

    setPersons(persons.filter(p => p.id !== person.id))
  }

  const waitToHideMessage = () =>
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  const addPerson = event => {
    event.preventDefault()

    let person = persons.find(person => person.name === newName)

    if (person) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) // this blocks the rendering
        changeNumber(person)

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService
      .add(newPerson)
      .then(response => handleAdded(response))
  }

  const changeNumber = person => {
    const newPerson = {
      ...person,
      number: newNumber
    }

    personsService
      .update(newPerson)
      .then(response => handleChanged(person, response))
      .catch(() => handleError(person))
  }

  const deletePerson = person => {
    if (!window.confirm(`Delete ${person.name}?`))  // this blocks the rendering
      return

    personsService
      .remove(person)
      .then(() => handleDeleted(person))
      .catch(() => handleError(person))
  }

  const personsShown = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Notification message={message} isError={messageIsError} />

      <h2>Phonebook</h2>
      <Filter value={filter} onChange={setFilter} />

      <h2>add a new</h2>
      <PersonForm name={newName} onNameChange={setNewName} number={newNumber} onNumberChange={setNewNumber} onSubmit={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={personsShown} onDelete={deletePerson} />
    </div>
  )
}

export default App
