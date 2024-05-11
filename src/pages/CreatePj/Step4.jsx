import { Button, Form } from "reactstrap";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { getTransfondos } from "../../services/services";
import RadioGroup from "../../components/form/RadioGroup";

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
    const languages = []

    transfondo?.starting_proficiencies?.forEach(proficiency => {
      if (proficiency.type === 'skill') {
        skills.push(proficiency.index)
      }
    })
    
    const formData = new FormData(evt.target);
    
    const checkboxes = {};

    for (let [name, value] of formData.entries()) {
      if (value === 'on') {
        checkboxes[name] = true;
      }
    }

    Object.keys(checkboxes).forEach(check => {
      const values = check.split('_')
      if (values[0] === 'language') {
        languages.push(values[1])
      }
    })

    cambiarStep({
      background: transfondo.index,
      skills,
      languages
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
      {
        transfondo?.options?.map((options, index) =>
          <RadioGroup
            key={index}
            datos={options}
            nombreCompetencia={nombreCompetencia}
            disableds={character?.languages} />
        )
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