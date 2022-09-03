const PersonForm = ({ name, onNameChange, number, onNumberChange, onSubmit }) => 
  <form onSubmit={onSubmit}>
    <div>Name: <input value={name} onChange={event => onNameChange(event.target.value)} /></div>
    <div>Number: <input value={number} onChange={event => onNumberChange(event.target.value)} /></div>
    <div><button type="submit">Add</button></div>
  </form>

export default PersonForm