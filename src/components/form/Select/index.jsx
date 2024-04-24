export default function Select({ id, label, options, value, onChange, hidden, nullable }) {
  return (
    <div className='mb-3' hidden={hidden}>
      <label className='form-label' for={id}>
        {label}
      </label>

      <select
        id={id}
        name={id} 
        className='form-select'
        type="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        { nullable && <option key='-' value=''> - </option> }
        {options.map(option => (
          <option key={option.index} value={option.index}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}