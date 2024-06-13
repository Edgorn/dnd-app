import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "reactstrap";
import { getRazas } from "../../services/services";
import TextoCompetencias from "../../components/form/TextoCompetencias";
import Imagen from "../../components/Imagen";
import MultiSelect from "../../components/form/MultiSelect";
import Slider from "react-slick";

export default function StepRaza({ character, cambiarStep, anteriorStep }) {
  const [razas, setRazas] = useState([])
  const [race, setRace] = useState(null)
  const [subrace, setSubrace] = useState(null)
  const [type, setType] = useState(null)
  const [optionsRace, setOptionsRace] = useState([])
  const [optionsSubrace, setOptionsSubrace] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0);

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
    setRace(razas[index])
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
      } else if (option.type === 'conjuro' || option.type === 'truco') {
        spells.push(...values.map(value => {
          const type = option.options.find(opt => opt.index === value)?.type ?? null
          return {
            index: value, type: type
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
      } else if (option.type === 'conjuro' || option.type === 'truco') {
        spells.push(...values.map(value => {
          const type = option.options.find(opt => opt.index === value)?.type ?? null
          return {
            index: value, type: type
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

  const settingsRaza = {
    dots: true, // Mostrar indicadores
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra tres imágenes por vez
    slidesToScroll: 1,
    centerMode: true, // Centra la imagen seleccionada
    centerPadding: '0',
    beforeChange: (current, next) => seleccionarRaza(next),
    arrows: true // Mostrar flechas de navegación
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="slider-container">
        <Slider {...settingsRaza}>
          {razas?.map((raza, index) => (
            <div key={index}>
              <div className={`race-option ${race.index===raza.index ? 'selected' : ''}`}>
                <Imagen index={raza.index} />
                <span>{raza.name}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Row style={{marginTop: '2em'}}>
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
        </Col>
        <Col>
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
    <Button color='primary'>
      Siguiente
    </Button>
    </Form>
  )
}