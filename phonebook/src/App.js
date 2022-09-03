import { useState } from 'react'

const Filter = ({ value, onChange }) => 
  <div>filter shown filter <input value={value} onChange={event => onChange(event.target.value)} /></div>

const Persons = ({ persons }) => 
  <div>
    {persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number} />
    )}
  </div>

const Person = ({ name, number }) =>
  <p>{name} {number}</p>

const PersonForm = ({ name, onNameChange, number, onNumberChange, onSubmit }) => 
  <form onSubmit={onSubmit}>
    <div>name: <input value={name} onChange={event => onNameChange(event.target.value)} /></div>
    <div>number: <input value={number} onChange={event => onNumberChange(event.target.value)} /></div>
    <div><button type="submit">add</button></div>
  </form>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = event => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)   // this blocks the rendering
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(person))
  }

  const personsShown = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={setFilter} />

      <h2>add a new</h2>
      <PersonForm name={newName} onNameChange={setNewName} number={newNumber} onNumberChange={setNewNumber} onSubmit={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={personsShown} />
    </div>
  )
}

export default App
