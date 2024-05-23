import { Button, Card, CardBody, CardHeader, Form } from "reactstrap";
import Input from "../../components/form/Input";

export default function StepAspecto({ appearance, cambiarStep, anteriorStep }) {

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formData = new FormData(evt.target);

    const age = parseInt(formData.get('age'));
    const height = parseInt(formData.get('height'));
    const weight = parseInt(formData.get('weight'));
    const eyes = formData.get('eyes');
    const hair = formData.get('hair');
    const skin = formData.get('skin');

    cambiarStep({ appearance: { age, height, weight, eyes, hair, skin } })
  }

  return (
      <Card>
        <CardHeader>
          Aspecto
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Input
              id='age'
              label='Años'
              defaultValue={appearance?.age ?? 0}
              type='number'
              onChange={() => {}} />

            <Input
              id='height'
              label='Altura (cm)'
              defaultValue={appearance?.height ?? 0}
              type='number'
              onChange={() => {}} />

            <Input
              id='weight'
              label='Peso (kg)'
              defaultValue={appearance?.weight ?? 0}
              type='number'
              onChange={() => {}} />

            <Input
              id='eyes'
              label='Color de los ojos'
              defaultValue={appearance?.eyes ?? ''}
              onChange={() => {}} />

            <Input
              id='hair'
              label='Color del pelo'
              defaultValue={appearance?.hair ?? ''}
              onChange={() => {}} />

            <Input
              id='skin'
              label='Color de la piel'
              defaultValue={appearance?.skin ?? ''}
              onChange={() => {}} />


            <Button color='secondary' onClick={anteriorStep}>
              Anterior
            </Button>

            <Button color='primary'>
              Siguiente
            </Button>
          </Form>
        </CardBody>
      </Card>
  )
}