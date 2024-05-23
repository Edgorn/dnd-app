import { Button, Card, CardBody, CardHeader, Form } from "reactstrap";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import { alineamientos } from "../../data/data";

export default function Step1({ character, cambiarStep }) {

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formData = new FormData(evt.target);

    const name = formData.get('name');
    const alignment = formData.get('alignment');

    if (name && alignment) {
      cambiarStep({ name, alignment })
    }
  }

  return (
      <Card>
        <CardHeader>
          Nombre
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Input
              id='name'
              label='Nombre del personaje'
              defaultValue={character?.name ?? ''}
              onChange={() => {}} />

            <Select
              id='alignment' 
              label='Alineamiento' 
              options={alineamientos} 
              defaultValue={character?.alignment ?? ''} 
              onChange={() => {}} />

            <Button color='primary'>
              Siguiente
            </Button>
          </Form>
        </CardBody>
      </Card>
  )
}