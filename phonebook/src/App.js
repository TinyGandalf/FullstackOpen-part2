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

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => { personsService.getAll().then(response => setPersons(response)) }, [])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const newPerson = event => {
    event.preventDefault()

    let person = persons.find(person => person.name === newName)

    if (person) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) // this blocks the rendering
        replaceNumber(person)
      
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService
      .add(newPerson)
      .then(response => setPersons(persons.concat(response)))
  }

  const replaceNumber = person => {
    const newPerson = {
      ...person,
      number: newNumber
    }

    personsService
      .update(newPerson)
      .then(response => setPersons(persons.map(p => p.id !== person.id ? p : response)))
  }

  const deletePerson = person => {
    if (!window.confirm(`Delete ${person.name}?`)) { // this blocks the rendering
      return;
    }

    personsService
      .remove(person)
      .then(() => setPersons(persons.filter(p => p.id !== person.id)))
  }
 
  const personsShown = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={setFilter} />

      <h2>add a new</h2>
      <PersonForm name={newName} onNameChange={setNewName} number={newNumber} onNumberChange={setNewNumber} onSubmit={newPerson} />

      <h2>Numbers</h2>
      <Persons persons={personsShown} onDelete={deletePerson} />
    </div>
  )
}

export default App
