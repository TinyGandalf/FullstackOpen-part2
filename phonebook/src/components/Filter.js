const Filter = ({ value, onChange }) => 
  <div>filter shown filter <input value={value} onChange={event => onChange(event.target.value)} /></div>

export default Filter