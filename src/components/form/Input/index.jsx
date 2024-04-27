export default function InputText({ id, label, value, onChange, disabled }) {
  return (
    <div className='form-floating mb-3'>
      <input
        id={id}
        name={id} 
        type="text" 
        className='form-control'
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled} />

      <label className='form-label' for={id}>
        {label}
      </label>
    </div>
  )
}