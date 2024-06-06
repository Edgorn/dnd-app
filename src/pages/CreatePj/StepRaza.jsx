import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "reactstrap";
import { getRazas } from "../../services/services";
import TextoCompetencias from "../../components/form/TextoCompetencias";
import Imagen from "../../components/Imagen";
import MultiSelect from "../../components/form/MultiSelect";

export default function StepRaza({ character, cambiarStep, anteriorStep }) {
  const [razas, setRazas] = useState([])
  const [race, setRace] = useState(null)
  const [subrace, setSubrace] = useState(null)
  const [type, setType] = useState(null)
  const [optionsRace, setOptionsRace] = useState([])
  const [optionsSubrace, setOptionsSubrace] = useState([])

  useEffect(() => {
    getRazas().then(response => {
      setRazas(response)
      setRace(response.find(r => r.index === character.race) ?? response[0] ?? null)
    })
  }, [character.race])

  useEffect(() => {
    setOptionsSubrace(subrace?.options?.map(() => []))
    setOptionsRace(race?.options?.map(() => []))
    setSubrace(race?.subraces[0] ?? null)
  }, [race])

  useEffect(() => {
    if (subrace?.types) {
      setType(subrace?.types[0] ?? null)
    } else {
      setType(null)
    }
    setOptionsSubrace(subrace?.options?.map(() => []))
  }, [subrace])

  const seleccionarRaza = (index) => {
    setRace(razas?.find(r => r.index === index))
  }

  const seleccionarSubraza = (index) => {
    setSubrace(race?.subraces?.find(r => r.index === index) ?? null)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const proficiencies = [
      ...race?.proficiencies?.filter(prof => prof.type !== 'habilidad').map(prof => prof.index) ?? [],
      ...subrace?.proficiencies?.filter(prof => prof.type !== 'habilidad').map(prof => prof.index) ?? []
    ]

    const languages = [
      ...race?.languages?.map(lang => lang.index) ?? [],
      ...subrace?.languages?.map(lang => lang.index) ?? []
    ]

    const ability_bonuses = { }

    const skills = [
      ...race?.proficiencies?.filter(prof => prof.type === 'habilidad').map(prof => prof.index) ?? [],
      ...subrace?.proficiencies?.filter(prof => prof.type === 'habilidad').map(prof => prof.index) ?? []
    ]

    const spells = [
      ...race?.spells?.map(prof => { return { index: prof.index, type: prof.type } }) ?? [],
      ...subrace?.spells?.map(prof => { return { index: prof.index, type: prof.type } }) ?? []
    ]

    race.ability_bonuses.forEach(ability => {
      ability_bonuses[ability.index] = ability.bonus
    })

    race?.options?.forEach((option, index) => {
      const values = optionsRace[index].map(opt => opt.value) ?? []

      if (option.type === 'caracteristica') {
        values.forEach(value => {
          if (ability_bonuses[value]) {
            ability_bonuses[value] += 1
          } else {
            ability_bonuses[value] = 1
          }
        })
      } else if (option.type === 'habilidad') {
        skills.push(...values)
      } else if (option.type === 'idioma') {
        languages.push(...values)
      } else if (option.type.split('_')[0] === 'conjuro') {
        spells.push(...values.map(value => { 
          return {
            index: value, type: option.type.split('_')[1]
          }
        }))
      } else {
        proficiencies.push(...values)
      }
    })

    subrace?.options?.forEach((option, index) => {
      const values = optionsSubrace[index].map(opt => opt.value) ?? []

      if (option.type === 'caracteristica') {
        values.forEach(value => {
          if (ability_bonuses[value]) {
            ability_bonuses[value] += 1
          } else {
            ability_bonuses[value] = 1
          }
        })
      } else if (option.type === 'habilidad') {
        skills.push(...values)
      } else if (option.type === 'idioma') {
        languages.push(...values)
      } else if (option.type.split('_')[0] === 'conjuro') {
        spells.push(...values.map(value => { 
          return {
            index: value, type: option.type.split('_')[1]
          }
        }))
      } else {
        proficiencies.push(...values)
      }
    })

    cambiarStep({
      race: race?.index ?? '',
      subrace: subrace?.index ?? '',
      type: type?.name ?? '',
      ability_bonuses,
      raceData: {
        proficiencies,
        skills,
        spells,
        languages
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Row>
            {razas?.map(raza => (
              <Col md={12} lg={4} className="race-col">
                <div className={'race-option ' + (race.index===raza.index ? 'selected' : '')} onClick={() => seleccionarRaza(raza.index)}>
                  <Imagen index={raza.index} />
                  <span>{raza.name}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col>
          <h3>{race?.name ?? ''}</h3>
          <p style={{textAlign: 'justify'}}>{race?.desc ?? ''}</p>

          <ul>
            <li><b>Velocidad: </b>{race?.speed}.</li>
            <li><b>Tamaño: </b>{race?.size}.</li>

            {
              race?.languages?.length > 0
              &&
              <li><b>Idiomas: </b> {race?.languages?.map(language => language.name).join(', ')}.</li>
            }

            {
              race?.ability_bonuses?.length > 0
              &&
              <li><b>Bonus caracteristicas: </b> {race?.ability_bonuses?.map(bonus => '+' + bonus.bonus + ' ' + bonus.name).join(', ')}.</li>
            }

            <TextoCompetencias competencias={race?.proficiencies} />

            {
              race?.traits?.map(trait => {
                return (
                  <li style={{textAlign: 'justify'}}><b>{trait.name}: </b>{trait.desc}</li>
                )
              })
            }
          </ul>

          {
            race?.options?.map((proficiency_options, index) => {
              return (
                <MultiSelect 
                  index={index}
                  label={proficiency_options.type}
                  options={proficiency_options.options}
                  selectedOptions={optionsRace}
                  setOptions={setOptionsRace}
                  max={proficiency_options?.choose}
                  disabled={race?.languages}
                />
              )
            })
          }
        </Col>
      </Row>

      <div className="divider"></div>

      <Row>
        <Col>
          <Row>
            {race?.subraces?.map(subraza => (
              <Col md={12} lg={4} className="race-col">
                <div className={'race-option ' + (subrace?.index===subraza.index ? 'selected' : '')} onClick={() => seleccionarSubraza(subraza?.index)}>
                  <Imagen index={subraza?.index} />
                  <span>{subraza?.name}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col>
          <h3>{subrace?.name ?? ''}</h3>
          <p style={{textAlign: 'justify'}}>{subrace?.desc ?? ''}</p>
          
          <ul>
            {
              subrace?.speed 
              && 
              <li><b>Velocidad: </b>{subrace?.speed}.</li>
            }

            {
              subrace?.ability_bonuses?.length > 0
              &&
              <li><b>Bonus caracteristicas: </b> {subrace?.ability_bonuses?.map(bonus => '+' + bonus.bonus + ' ' + bonus.name).join(', ')}.</li>
            }

            <TextoCompetencias competencias={subrace?.proficiencies} />

            {
              subrace?.traits?.map(trait => {
                return (
                  <li style={{textAlign: 'justify'}}><b>{trait.name}: </b>{trait.desc}</li>
                )
              })
            }
            
            {
              subrace?.options?.map((proficiency_options, index) => {
                return (
                  <MultiSelect 
                    index={index}
                    label={proficiency_options.type}
                    options={proficiency_options.options}
                    selectedOptions={optionsSubrace}
                    setOptions={setOptionsSubrace}
                    max={proficiency_options?.choose}
                    disabled={race?.languages}
                  />
                )
              })
            }
          </ul>
        </Col>
      </Row>
      
      <div className="divider"></div>

      <Row>
        <Col>
          <Row>
            {subrace?.types?.map(tipo => (
              <Col md={12} lg={4} className="race-col">
                <div className={'race-option ' + (type?.name===tipo.name ? 'selected' : '')} onClick={() => setType(tipo)}>
                  <Imagen index={tipo.name} />
                  <span>{tipo.name}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col>
          <h3>{type?.name ?? ''}</h3>
          <p style={{textAlign: 'justify'}}>{type?.desc ?? ''}</p>
        </Col>
      </Row>
      {/*}

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
    */}
    <Button color='primary'>
      Siguiente
    </Button>
    </Form>
  )
}