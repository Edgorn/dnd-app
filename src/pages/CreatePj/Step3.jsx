import { Button, Form } from "reactstrap";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { getClases } from "../../services/services";
import RadioGroup from "../../components/form/RadioGroup";
import RadioGroupGroup from "../../components/form/RadioGroupGroup";
import TextoCompetencias from "../../components/form/TextoCompetencias";

export default function Step3({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  const [clase, setClase] = useState([])
  const [clases, setClases] = useState([])

  const disableds = [
    ...character?.raceData?.skills ?? [],
    ...character?.raceData?.proficiencies ?? []
  ]

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
    const proficiencies = []

    Object.keys(checkboxes).forEach(check => {
      const values = check.split('_')

      if (values[0] === 'skill') {
        skills.push(values[1])
      } else if (values[0] === 'reference') {
        proficiencies.push(values[1])
      }
    })


    clase?.starting_proficiencies?.forEach(proficiency => {
      proficiencies.push(proficiency.index)
    })

    cambiarStep({
      class: clase.index,
      saving_throws: clase.saving_throws,
      prof_bonus: clase?.levels[0]?.prof_bonus,
      classData: {
        skills,
        proficiencies
      }
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

      <ul>
        <TextoCompetencias competencias={clase?.starting_proficiencies} nombreCompetencia={nombreCompetencia} />
      </ul>

      {
        clase?.options?.map((proficiency_options, index) =>
          proficiency_options.type === 'choice'
          ?
          <RadioGroupGroup
            key={index}
            datos={proficiency_options}
            nombreCompetencia={nombreCompetencia}
            disableds={disableds} />
          :
          <RadioGroup
            key={index}
            datos={proficiency_options}
            nombreCompetencia={nombreCompetencia}
            disableds={disableds} />
        )
      }

      <Button color='secondary' onClick={anteriorStep}>
        Anterior
      </Button>
      
      <Button color='primary'>
        Siguiente
      </Button>
    </Form>
  )
}