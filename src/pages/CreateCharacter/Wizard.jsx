export default function Wizard({ step }) {

  const steps = ['Razas', 'Aspecto', 'Clases', 'Transfondos']

  return (
    <ol className='forms-wizard'>
      {
        steps.map((s, index) => 
          <li 
            className={
              step === index 
                ? 'form-wizard-step-doing' 
                : step > index 
                  ? 'form-wizard-step-done'
                  : ''
            }
          >
            <em>{index + 1}</em>
            <span>{steps[index]}</span>
          </li>
        )
      }
    </ol>
  )
}