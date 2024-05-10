import { useEffect, useState } from "react";
import { Button, Form } from "reactstrap";
import { getRazas } from "../../services/services";
import Select from "../../components/form/Select";
import RadioGroup from "../../components/form/RadioGroup";

export default function Step2({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  const [razas, setRazas] = useState([])
  const [raza, setRaza] = useState(null)
  const [subraza, setSubraza] = useState(null)

  useEffect(() => {
    getRazas().then(response => {
      setRazas(response)
      setRaza(response.find(r => r.index === character.race) ?? response[0] ?? null)
    })
  }, [character.race])

  useEffect(() => {
    setSubraza(raza?.subraces[0] ?? null)
  }, [raza])

  const seleccionarRaza = (nombre) => {
    setRaza(razas.find(r => r.index === nombre))
  }

  const seleccionarSubraza = (nombre) => {
    setSubraza(raza?.subraces?.find(r => r.index === nombre) ?? null)
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

    const ability_bonuses = { }

    raza?.ability_bonuses?.forEach(ability => {
      if (ability_bonuses[ability.index]) {
        ability_bonuses[ability.index] += ability.bonus
      } else {
        ability_bonuses[ability.index] = ability.bonus
      }
    })

    subraza?.ability_bonuses?.forEach(ability => {
      if (ability_bonuses[ability.index]) {
        ability_bonuses[ability.index] += ability.bonus
      } else {
        ability_bonuses[ability.index] = ability.bonus
      }
    })

    const skills = []

    raza?.starting_proficiencies?.forEach(proficiency => {
      if (proficiency.type === 'skill') {
        skills.push(proficiency.index)
      }
    })

    Object.keys(checkboxes).forEach(check => {
      const values = check.split('_')

      if (values[0] === 'ability') {
        if (ability_bonuses[values[1]]) {
          ability_bonuses[values[1]] += 1
        } else {
          ability_bonuses[values[1]] = 1
        }
      } else if (values[0] === 'skill') {
        skills.push(values[1])
      }
    })

    cambiarStep({
      race: raza.index,
      ability_bonuses,
      skills,
      subrace: subraza?.index ?? ''
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        id='race' 
        label='Raza' 
        options={razas} 
        value={raza?.index ?? ''} 
        onChange={seleccionarRaza} />

      {
        raza?.ability_bonuses
        &&
        'Bonus habilidades: ' + raza?.ability_bonuses?.map(bonus => '+' + bonus.bonus + ' ' + nombreCompetencia(bonus.index, 'ability')).join(', ')
      }

      <br/>

      {
        raza?.starting_proficiencies
        &&
        'Competencias: ' +  raza?.starting_proficiencies?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')
      }

      <br/>

      {
        raza?.starting_proficiency_options?.map((proficiency_options, index) =>
          <RadioGroup
            key={index}
            datos={proficiency_options}
            nombreCompetencia={nombreCompetencia}
            disableds={raza?.starting_proficiencies?.map(prof => prof.index) ?? []} />
        )
      }

      <Select 
        id='subrace' 
        label='Subraza' 
        options={raza?.subraces ?? []} 
        value={subraza?.index ?? ''} 
        onChange={seleccionarSubraza} 
        hidden={raza?.subraces?.length === 0} />

      {
        subraza?.ability_bonuses
        &&
        'Bonus habilidades: ' + subraza?.ability_bonuses?.map(bonus => '+' + bonus.bonus + ' ' + nombreCompetencia(bonus.index, 'ability')).join(', ')
      }

      <br/>

      {
        subraza?.starting_proficiencies
        &&
        'Competencias: ' +  subraza?.starting_proficiencies?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')
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