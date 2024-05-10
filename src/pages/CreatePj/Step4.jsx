import { Button, Form } from "reactstrap";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { getTransfondos } from "../../services/services";

export default function Step4({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  
  const [transfondos, setTransfondos] = useState([])
  const [transfondo, setTransfondo] = useState([])

  useEffect(() => {
    getTransfondos().then(response => {
      setTransfondos(response)
      setTransfondo(response.find(r => r.index === character.background) ?? response[0] ?? null)
    })
  }, [character.background]);

  const seleccionarTransfondo = (nombre) => {
    setTransfondo(transfondos.find(r => r.index === nombre))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const skills = []

    transfondo?.starting_proficiencies?.forEach(proficiency => {
      if (proficiency.type === 'skill') {
        skills.push(proficiency.index)
      }
    })

    cambiarStep({
      background: transfondo.index,
      skills
    })
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Select
        id='background' 
        label='Transfondo' 
        options={transfondos} 
        value={transfondo?.index ?? ''} 
        onChange={seleccionarTransfondo}
        nullable />

      {
        transfondo?.starting_proficiencies
        &&
        'Competencias: ' +  transfondo?.starting_proficiencies?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')
      }

      <br/>

      <Button color='secondary' onClick={anteriorStep}>
        Anterior
      </Button>
      
      <Button color='primary'>
        Siguiente
      </Button>
    </Form>
  )
}