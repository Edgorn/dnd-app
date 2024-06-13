import { Button, ButtonGroup, Col, Form, Row } from "reactstrap";
import { Fragment, useEffect, useState } from "react";
import { getClases } from "../../services/services";
import TextoCompetencias from "../../components/form/TextoCompetencias";
import Imagen from "../../components/Imagen";
import TextoPuntosGolpe from "../../components/form/TextoPuntosGolpe";
import MultiSelect from "../../components/form/MultiSelect";
import InputText from "../../components/form/Input";

export default function StepClase({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  const [clase, setClase] = useState([])
  const [clases, setClases] = useState([])
  const [optionsClase, setOptionsClase] = useState([])
  const [optionsEquipment, setOptionsEquipment] = useState([])
  const [optionsEquipmentSelect, setOptionsEquipmentSelect] = useState([])
  const [optionsConjuros, setOptionsConjuros] = useState([])
  const [pack, setPack] = useState('')
  const [subclass, setSubclass] = useState(null)

  const disableds = [
    ...character?.raceData?.skills?.map(skill => { return { index: skill } }) ?? []
  ]

  useEffect(() => {
    getClases().then(response => {
      setClases(response ?? [])
      setClase(response.find(r => r.index === character.class) ?? response[0] ?? null)
    })
  }, [character.class])

  
  useEffect(() => {
    setOptionsClase(clase?.options?.map(() => []))
    setOptionsEquipment(clase?.equipment_options?.map(() => []))
    setOptionsEquipmentSelect(clase?.equipment_options?.map(() => 0))
    setOptionsConjuros(clase?.spellcasting_options?.map(() => []))
    setPack('')
    setSubclass(clase?.subclases_options ? (clase?.subclases_options[0]?.options[0] ?? null) : null)
  }, [clase])

  const seleccionarClase = (nombre) => {
    setClase(clases.find(r => r.index === nombre))
  }

  const seleccionarSubclase = (subclass) => {
    setSubclass(subclass)
  }

  const seleccionarEquipo = (index, index2) => {
    const options = [...optionsEquipmentSelect]
    options[index] = index2
    setOptionsEquipmentSelect(options)
  }

  const RenderDescription = ({ desc }) => {
    const content = desc?.split('\n')?.map((line, index) => (
      <Fragment key={index}>
        {line}
        {index < desc.split('\n').length - 1 && <br />}
      </Fragment>
    ));

    return <>{content}</>;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formData = new FormData(evt.target);

    let money = formData.get('money');

    const equipment = clase.equipment.map(eq => { return { index: eq.index, quantity: eq.quantity } })
    const spells = subclass?.spells?.map(spell => spell.index) ?? []

    const proficiencies = [
      ...clase?.proficiencies?.filter(prof => prof.type !== 'habilidad').map(prof => prof.index) ?? []
    ]

    const skills = [
      ...clase?.proficiencies?.filter(prof => prof.type === 'habilidad').map(prof => prof.index) ?? []
    ]

    clase?.options?.forEach((option, index) => {
      const values = optionsClase[index]?.map(opt => opt.value) ?? []

      if (option.type === 'habilidad') {
        skills.push(...values)
      } 
    })

    clase?.equipment_options?.forEach((option, index) => {
      const opcionSeleccionada = option[optionsEquipmentSelect[index]]
      if (opcionSeleccionada?.items) {
        equipment.push(...opcionSeleccionada?.items ?? [])
      } else {
        const values = optionsEquipment[index]?.map(opt => opt.value) ?? []
        equipment.push(...values)
      }
    })

    clase?.spellcasting_options?.forEach((option, index) => {
      const values = optionsConjuros[index]?.map(opt => opt.value) ?? []

      spells.push(...values)
    })

    if (pack !== 'money') {
      money = 0
      equipment.push({ index: pack, quantity: 1 })
    }

    cambiarStep({
      class: clase.index,
      subclass: subclass?.index ?? '',
      classData: {
        proficiencies,
        skills,
        spells,
        money
      },
      equipment
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Row>
            {clases?.map(clas => (
              <Col md={12} lg={4} className="race-col">
                <div className={'race-option ' + (clase.index===clas.index ? 'selected' : '')} onClick={() => seleccionarClase(clas.index)}>
                  <Imagen index={clas.index} />
                  <span>{clas.name}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col>
          <h3>{clase?.name ?? ''}</h3>
          <p style={{textAlign: 'justify'}}>{clase?.desc ?? ''}</p>

          <ul>
            {
              clase?.traits?.map(trait => {
                return (
                  <li style={{textAlign: 'justify'}}>
                    <b>{trait.name}: </b>
                    <RenderDescription desc={trait.desc} />
                  </li>
                )
              })
            }
          </ul>
          
          <TextoPuntosGolpe hit_die={clase.hit_die} name={clase.name} />

          <h4>Competencias</h4>
          <ul>
            <TextoCompetencias competencias={clase?.proficiencies} />
            <li>
              <b>Tiradas de salvación: </b> {clase?.saving_throws?.map(sav => sav.name).join(', ')}.
            </li>
          </ul>
          {
            clase?.options?.map((proficiency_options, index) => {
              return (
                <MultiSelect 
                  index={index}
                  label={proficiency_options.type}
                  options={proficiency_options.options}
                  selectedOptions={optionsClase}
                  setOptions={setOptionsClase}
                  max={proficiency_options?.choose}
                  disabled={disableds}
                  competencias
                />
              )
            })
          }

          {
            clase?.spellcasting_options?.length > 0
            &&
            <>
              <br/>
              <h4>Conjuros</h4>
            </>
          }
          {
            clase?.spellcasting_options?.map((proficiency_options, index) => {
              return (
                <MultiSelect 
                  index={index}
                  label={proficiency_options.type}
                  options={proficiency_options.options}
                  selectedOptions={optionsConjuros}
                  setOptions={setOptionsConjuros}
                  max={proficiency_options?.choose}
                  disabled={disableds}
                  competencias
                />
              )
            })
          }

          <br/>
          <h4>Equipo</h4>
          <ul>
            {clase?.equipment?.map(equip => (
              <li>{equip.quantity+'x '+equip.name}</li>
            ))}
          </ul>

          {
            clase?.equipment_options?.map((proficiency_options, index) => {
              const options = optionsEquipmentSelect ?? [0]
              const select = options[index] ?? 0
              
              return (
                <>
                  <ButtonGroup>
                    {
                      proficiency_options.map(((options, index2) => {
                        return (
                          <Button
                            color="primary"
                            onClick={() => seleccionarEquipo(index, index2)}
                            style={(optionsEquipmentSelect ? optionsEquipmentSelect[index] : 0)===index2 ? {backgroundColor: '#0a58ca'} : {}}
                          >
                            {options.name}
                          </Button>
                        )
                      }))
                    }
                  </ButtonGroup>
                  <br/>
                  {
                    proficiency_options[select]?.options
                    ?
                    <>
                      <MultiSelect 
                        index={index}
                        label={proficiency_options[select]?.name ?? ''}
                        options={proficiency_options[select]?.options.map(opt => { 
                          return { 
                            index: { index: opt.index, quantity: opt.quantity }, 
                            name: opt.quantity + 'x ' + opt.name
                          } 
                        })}
                        selectedOptions={optionsEquipment}
                        setOptions={setOptionsEquipment}
                        max={proficiency_options[select]?.choose}
                        disabled={disableds}
                      />
                      <br/>
                    </>
                    :
                    <br/>
                  }
                </>
              )
            })
          }
          
          <ButtonGroup>
            {
              clase?.money?.map(opt => (
                <Button color="primary" onClick={() => setPack(opt?.index)} active={pack===opt.index}>
                  {opt.name}
                </Button>
              ))
            }
          </ButtonGroup>

          {
            pack === 'money'
            &&
            <>
              <br/>
              <br/>
              <InputText
                id='money'
                label='Dinero inicial'
                defaultValue={0}
                type='number'
                onChange={() => {}} />
            </>
          }
        </Col>
      </Row>

      <div className="divider"></div>

      <Row>
        <Col>
          <Row>
            {clase?.subclases_options?.map(optionSubclase => (
              <>
                <h2>{optionSubclase.name}</h2>
                <p style={{textAlign: 'justify', whiteSpace: 'pre-line'}}>
                  {optionSubclase?.desc ?? ''}
                </p>
                {optionSubclase?.options?.map(subclase => (
                  <Col md={12} lg={4} className="race-col">
                    <div className={'race-option ' + (subclass?.index===subclase.index ? 'selected' : '')} onClick={() => seleccionarSubclase(subclase)}>
                      <Imagen index={subclase?.index} />
                      <span>{subclase?.name}</span>
                    </div>
                  </Col>
                ))}
              </>
            ))}
          </Row>
        </Col>
        <Col>
          <h3>{subclass?.name ?? ''}</h3>
          <ul>
            {
              subclass?.traits?.map(trait => {
                return (
                  <li style={{textAlign: 'justify'}}>
                    <b>{trait.name}: </b>
                    <RenderDescription desc={trait.desc} />
                  </li>
                )
              })
            }
          </ul>
          
            {subclass?.spells.length > 0
            &&
            <>
              <h4>Conjuros</h4>
              <ul>
                {subclass?.spells?.map(spell => (
                  <li>{spell.name}</li>
                ))}
              </ul>
            </>
          }
        </Col>
      </Row>
      <Button color='primary' type="submit">
        Siguiente
      </Button>
    </Form>
  )
}