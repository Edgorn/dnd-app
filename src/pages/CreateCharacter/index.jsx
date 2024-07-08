import { Button, Card, CardBody } from 'reactstrap'
import './CreateCharacter.css'
import StepRaza from '../CreatePj/StepRaza'
import useCreatePj from '../../hooks/useCreatePj'
import { rellenarFicha } from '../../services/services'
import { useState } from 'react'
import StepAspecto from '../CreatePj/StepAspecto'
import Wizard from './Wizard'
import StepClase from '../CreatePj/StepClase'
import StepTransfondo from '../CreatePj/StepTransfondo'

export default function CreateCharacter() {
  const [step, setStep] = useState(3)

  const { character, addData } = useCreatePj()

  const cambiarStep = (data) => {
    addData(data)
    //setStep(step+1)
  }

  const anteriorStep = () => {
    setStep(step-1)
  }

  const crearPersonaje = () => {
    rellenarFicha(character).then(response => {
      const file = window.URL.createObjectURL(response);
      window.open(file, '_blank');
    })
  }

  return (
    <div style={{padding: '1em'}}>
      <Card>
        <CardBody>
          <Wizard step={step} />
          
          <div className='form-wizard-content'>
            { step === 0 && <StepRaza character={character} cambiarStep={cambiarStep} /> }
            { step === 1 && <StepAspecto character={character} cambiarStep={cambiarStep} anteriorStep={anteriorStep} /> }
            { step === 2 && <StepClase character={character} cambiarStep={cambiarStep} anteriorStep={anteriorStep} /> }
            { step === 3 && <StepTransfondo character={character} cambiarStep={cambiarStep} anteriorStep={anteriorStep} /> }
          </div>
          <div>
            <Button onClick={crearPersonaje}>
              FICHA
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}