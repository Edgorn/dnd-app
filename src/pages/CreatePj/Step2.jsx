import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Form } from "reactstrap";
import { getRazas } from "../../services/services";
import Select from "../../components/form/Select";
import RadioGroup from "../../components/form/RadioGroup";
import TextoCompetencias from "../../components/form/TextoCompetencias";

export default function Step2({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  const [razas, setRazas] = useState([])
  const [raza, setRaza] = useState(null)
  const [subraza, setSubraza] = useState(null)
  const [tipo, setTipo] = useState(null)

  useEffect(() => {
    getRazas().then(response => {
      setRazas(response)
      setRaza(response.find(r => r.index === character.race) ?? response[0] ?? null)
    })
  }, [character.race])

  useEffect(() => {
    setSubraza(raza?.subraces[0] ?? null)
  }, [raza])

  useEffect(() => {
  
    if (subraza?.types) {
      setTipo(subraza?.types[0] ?? null)
    } else {
      setTipo(null)
    }
  }, [subraza])

  const seleccionarRaza = (nombre) => {
    setRaza(razas.find(r => r.index === nombre))
  }

  const seleccionarSubraza = (nombre) => {
    setSubraza(raza?.subraces?.find(r => r.index === nombre) ?? null)
  }

  const seleccionarTipo = (nombre) => {
    setTipo(subraza?.types?.find(r => r.name === nombre) ?? null)
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
    const proficiencies = []

    raza?.starting_proficiencies?.forEach(proficiency => {
      if (proficiency.type === 'habilidad') {
        skills.push(proficiency.index)
      } else {
        proficiencies.push(proficiency.index)
      }
    })
    
    subraza?.starting_proficiencies?.forEach(proficiency => {
      if (proficiency.type === 'habilidad') {
        skills.push(proficiency.index)
      } else {
        proficiencies.push(proficiency.index)
      }
    })

    const languages = [...raza?.languages]

    const spells = [...subraza?.spells ?? []]

    Object.keys(checkboxes).forEach(check => {
      const values = check.split('_')
      console.log(values)
      if (values[0] === 'caracteristica') {
        if (ability_bonuses[values[1]]) {
          ability_bonuses[values[1]] += 1
        } else {
          ability_bonuses[values[1]] = 1
        }
      } else if (values[0] === 'habilidad') {
        skills.push(values[1])
      } else if (values[0] === 'idioma') {
        languages.push(values[1])
      } else if (values[0] === 'conjuro') {
        spells.push(values[2] + '_' + values[1])
      } else {
        proficiencies.push(values[1])
      }
    })

    cambiarStep({
      race: raza.index,
      subrace: subraza?.index ?? '',
      type: tipo?.name ?? '',
      ability_bonuses,
      spells,
      raceData: {
        skills,
        languages,
        proficiencies
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        Seleccion de raza
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Select
            id='race' 
            label='Raza' 
            options={razas} 
            value={raza?.index ?? ''} 
            onChange={seleccionarRaza} />

          <p style={{textAlign: 'justify'}}>{raza?.desc ?? ''}</p>

          <ul>
            {
              raza?.ability_bonuses
              &&
              <li>{'Bonus caracteristicas: ' + raza?.ability_bonuses?.map(bonus => '+' + bonus.bonus + ' ' + nombreCompetencia(bonus.index, 'caracteristica')).join(', ')}</li>
            }
            
            <li>{'Idiomas: ' +  raza?.languages?.map(language => nombreCompetencia(language, 'idioma')).join(', ') } </li>

            <TextoCompetencias competencias={raza?.starting_proficiencies} nombreCompetencia={nombreCompetencia} />

          </ul>

          {
            raza?.options?.map((proficiency_options, index) =>
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

          <p style={{textAlign: 'justify'}}>{subraza?.desc ?? ''}</p>

          <Select 
            id='type' 
            label='Tipo' 
            options={subraza?.types ?? []} 
            value={tipo?.name ?? ''} 
            onChange={seleccionarTipo} 
            hidden={!subraza?.types | subraza?.types?.length === 0} />

          <p style={{textAlign: 'justify'}}>{tipo?.desc ?? ''}</p>
          
          <ul>
            {
              subraza?.ability_bonuses?.length > 0
              &&
              <li>{'Bonus caracteristicas: ' + subraza?.ability_bonuses?.map(bonus => '+' + bonus.bonus + ' ' + nombreCompetencia(bonus.index, 'caracteristica')).join(', ')}</li>
            }
            
            {
              subraza?.spells
              &&
              <li>{'Conjuros: ' +  subraza?.spells?.map(spell => nombreCompetencia(spell, 'conjuro')).join(', ') }</li>
            }
            
            <TextoCompetencias competencias={subraza?.starting_proficiencies} nombreCompetencia={nombreCompetencia} />
          </ul>

          {
            subraza?.options?.map((proficiency_options, index) =>
              <RadioGroup
                key={index}
                datos={proficiency_options}
                nombreCompetencia={nombreCompetencia}
                disableds={[]} />
            )
          }

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