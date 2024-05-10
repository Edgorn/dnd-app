import { Button, Form } from "reactstrap";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { getClases } from "../../services/services";
import RadioGroup from "../../components/form/RadioGroup";

export default function Step3({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  const [clase, setClase] = useState([])
  const [clases, setClases] = useState([])

  useEffect(() => {
    getClases().then(response => {
      setClases(response)
      setClase(response.find(r => r.index === character.class) ?? response[0] ?? null)
    })
  }, [character.class])

  const seleccionarClase = (nombre) => {
    setClase(clases.find(r => r.index === nombre))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formData = new FormData(evt.target);

    const checkboxes = {};

    for (let [name, value] of formData.entries()) {
      if (value === 'on') {
        checkboxes[name] = true;
      }
    }
    
    const skills = []

    Object.keys(checkboxes).forEach(check => {
      const values = check.split('_')

      if (values[0] === 'skill') {
        skills.push(values[1])
      }
    })

    cambiarStep({
      class: clase.index,
      saving_throws: clase.saving_throws,
      skills,
      prof_bonus: clase?.levels[0]?.prof_bonus
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        id='class' 
        label='Clase' 
        options={clases} 
        value={clase?.index ?? ''} 
        onChange={seleccionarClase} />

      <br/>

      {
        clase?.proficiency_options?.map((proficiency_options, index) =>
          <RadioGroup
            key={index}
            datos={proficiency_options}
            nombreCompetencia={nombreCompetencia}
            disableds={character?.skills} />
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