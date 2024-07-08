import { Button, Form } from "reactstrap";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { getTransfondos } from "../../services/services";
import RadioGroup from "../../components/form/RadioGroup";
import TextoCompetencias from "../../components/form/TextoCompetencias";
import Input from "../../components/form/Input";
import { alineamientos } from "../../data/data";

export default function StepTransfondo({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  
  const [transfondos, setTransfondos] = useState([])
  const [transfondo, setTransfondo] = useState([])

  const disableds = [
    ...character?.raceData?.skills ?? [],
    ...character?.raceData?.proficiencies ?? [],
    ...character?.raceData?.languages ?? [],
    ...character?.classData?.skills ?? [],
    ...character?.classData?.proficiencies ?? []
  ]

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
    const proficiencies = []

    transfondo?.starting_proficiencies?.forEach(proficiency => {
      if (proficiency.type === 'skill') {
        skills.push(proficiency.index)
      } else if (proficiency.type === 'reference') {
        proficiencies.push(proficiency.index)
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
      } else if (values[0] === 'reference') {
        proficiencies.push(values[1])
      }
    })

    cambiarStep({
      background: transfondo.index,
      backgroundData: {
        skills,
        languages,
        proficiencies
      }
    })
  }

  return (
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

      <Select
        id='background' 
        label='Transfondo' 
        options={transfondos} 
        value={transfondo?.index ?? ''} 
        onChange={seleccionarTransfondo}
        nullable />

      <ul>
        <TextoCompetencias competencias={transfondo?.starting_proficiencies} nombreCompetencia={nombreCompetencia} />
      </ul>

      {
        transfondo?.options?.map((options, index) =>
          <RadioGroup
            key={index}
            datos={options}
            nombreCompetencia={nombreCompetencia}
            disableds={disableds} />
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