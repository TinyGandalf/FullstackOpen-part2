const Persons = ({ persons, onDelete }) => 
  <div>
    {persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number} onDelete={() => onDelete(person)} />
    )}
  </div>

const Person = ({ name, number, onDelete }) =>
  <p>{name} {number} <button onClick={onDelete}>delete</button></p>

export default Persons