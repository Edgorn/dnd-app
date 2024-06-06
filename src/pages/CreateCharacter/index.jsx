import { Button, Card, CardBody } from 'reactstrap'
import './CreateCharacter.css'
import StepRaza from '../CreatePj/StepRaza'
import useCreatePj from '../../hooks/useCreatePj'
import { rellenarFicha } from '../../services/services'
import { useState } from 'react'
import StepAspecto from '../CreatePj/StepAspecto'
import Wizard from './Wizard'
import StepClases from '../CreatePj/StepClases'

export default function CreateCharacter() {
  const [step, setStep] = useState(2)

  const { character, addData } = useCreatePj()

  const cambiarStep = (data) => {
    addData(data)
    setStep(step+1)
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
            { step === 2 && <StepClases character={character} cambiarStep={cambiarStep} anteriorStep={anteriorStep} /> }
          </div>
          <div>
            <Button onClick={crearPersonaje}>
              FICHA
            </Button>
          </div>
          <div>4</div>
        </CardBody>
      </Card>
    </div>
  )
}