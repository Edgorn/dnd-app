import { Button, ButtonGroup, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
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
  const [optionsSubclase, setOptionsSubclase] = useState([])
  const [optionsEquipment, setOptionsEquipment] = useState([])
  const [optionsEquipmentSelect, setOptionsEquipmentSelect] = useState([])
  const [optionsConjuros, setOptionsConjuros] = useState([[]])
  const [optionsTerrain, setOptionsTerrain] = useState([[]])
  const [typeEnemy, setTypeEnemy] = useState(0)
  const [optionsEnemy, setOptionsEnemy] = useState([[]])
  const [pack, setPack] = useState('')
  const [subclass, setSubclass] = useState(null)
  const [trait, setTrait] = useState(undefined)
  const [optionsOptions, setOptionsOptions] = useState(0)
  const [rogue, setRogue] = useState([[]])

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
    setOptionsTerrain([[]])
    setTrait(clase?.traits_options?.options?.at(0))
  }, [clase])

  useEffect(() => {
    setOptionsSubclase(subclass?.options?.map(() => []))
  }, [subclass])

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
    const spells = [
      ...clase?.spells ?? [],
      ...subclass?.spells?.map(spell => spell.index) ?? []
    ]
    const languages = [
      ...subclass?.languages?.map(language => language.index) ?? []
    ]
    
    const dobleSkills = rogue[0]?.map(opt => opt.value) ?? []

    const proficiencies = [
      ...clase?.proficiencies?.filter(prof => prof.type !== 'habilidad').map(prof => prof.index) ?? [],
      ...subclass?.proficiencies?.filter(prof => prof.type !== 'habilidad').map(prof => prof.index) ?? []
    ]

    const skills = [
      ...clase?.proficiencies?.filter(prof => prof.type === 'habilidad').map(prof => prof.index) ?? []
    ]

    clase?.options?.forEach((option, index) => {
      const values = optionsClase[index]?.map(opt => opt.value) ?? []
      
      if (option.type === 'habilidad') {
        skills.push(...values)
      } else {
        proficiencies.push(...values)
      }
    })

    clase?.equipment_options?.forEach((option, index) => {
      const opcionSeleccionada = option[optionsEquipmentSelect[index]]
      
      if (opcionSeleccionada?.items) {
        equipment.push(...opcionSeleccionada?.items ?? [])
      } 
      
      if (opcionSeleccionada?.options) {
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

    subclass?.options?.forEach((option, index) => {
      const values = optionsSubclase[index]?.map(opt => opt.value) ?? []

      if (option.type === 'idioma') {
        languages.push(...values)
      } else if (option.type === 'habilidad (doble bonus)') {
        dobleSkills.push(...values)
      } else if (option.type === 'habilidad') {
        skills.push(...values)
      } else if (option.type === 'truco') {
        spells.push(...values)
      } else {
        console.log(option)
      }
    })

    cambiarStep({
      class: clase.index,
      subclass: subclass?.index ?? '',
      classData: {
        languages,
        proficiencies,
        skills,
        spells,
        money
      },
      equipment,
      dobleSkills,
      terrain: optionsTerrain[0]?.map(opt => opt.value) ?? [],
      enemy: optionsEnemy[0]?.map(opt => opt.value) ?? [],
      trait: trait?.index ?? ''
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
              clase?.traits
                ?.filter(trait => trait.index !== 'rogue-expertise')
                ?.map(trait => {
                  return (
                    <li style={{textAlign: 'justify'}}>
                      <b>{trait.name}: </b>
                      <RenderDescription desc={trait.desc} />
                    </li>
                  )
                })
            }
          </ul>

          {
            clase?.traits_options
            &&
            <>
              <FormGroup>
                <Label for="exampleSelect">
                  {clase?.traits_options?.name}
                </Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                >
                  {clase?.traits_options?.options.map(opt => (
                    <option onClick={() => setTrait(opt)}>
                      {opt.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <p>{trait?.desc}</p>
            </>
          }

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
              if (proficiency_options?.type === 'choice') {
                return (
                  <>
                    <br/>
                    <p>Elige en que quieres tener competencia:</p>
                    <ButtonGroup>
                      {
                        proficiency_options.options.map(((options, index2) => {
                          return (
                            <Button
                              color="primary"
                              onClick={() => setOptionsOptions(index2)}
                              style={optionsOptions === index2 ? {backgroundColor: '#0a58ca'} : {}}
                            >
                              {options?.type?.toUpperCase()}
                            </Button>
                          )
                        }))
                      }
                    </ButtonGroup>
                    <br/>
                    <MultiSelect 
                      index={index}
                      label={proficiency_options.options[optionsOptions].type}
                      options={proficiency_options.options[optionsOptions].options}
                      selectedOptions={optionsClase}
                      setOptions={setOptionsClase}
                      max={proficiency_options.options[optionsOptions]?.choose}
                      disabled={disableds}
                      competencias
                    />
                  </>
                )
              } else {
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
              }
            })
          }

          {
            clase?.terrain_options?.options
            &&
            <MultiSelect 
              index={0}
              label='terreno predilecto'
              options={clase?.terrain_options?.options ?? []}
              selectedOptions={optionsTerrain}
              setOptions={setOptionsTerrain}
              max={clase?.terrain_options?.choose}
              disabled={disableds}
            />
          }

          {
            clase?.enemy_options?.length > 0
            &&
            <>
              <br/>
              <ButtonGroup>
                {
                  clase?.enemy_options?.map(((options, index) => {
                    return (
                      <Button
                        color="primary"
                        onClick={() => { setTypeEnemy(index); setOptionsEnemy([]) }}
                        style={typeEnemy===index ? {backgroundColor: '#0a58ca'} : {}}
                      >
                        {options.name}
                      </Button>
                    )
                  }))
                }
              </ButtonGroup>
              <br/>

              <MultiSelect 
                index={0}
                label={clase?.enemy_options[typeEnemy]?.name ?? ''}
                options={clase?.enemy_options[typeEnemy]?.options ?? []}
                selectedOptions={optionsEnemy}
                setOptions={setOptionsEnemy}
                max={clase?.enemy_options[typeEnemy]?.choose}
                disabled={disableds}
              />
            </>
          }

          {
            clase?.traits?.find(trait => trait.index === 'rogue-expertise')
            &&
            <MultiSelect 
              index={0}
              label='habilidad (doble bonus)'
              options={optionsClase[0].map(opt => { return { index: opt.value, name: opt.label } }) ?? []}
              selectedOptions={rogue}
              setOptions={setRogue}
              max={2}
              disabled={disableds}
              competencias />
          }

          {
            clase?.spellcasting_options?.length > 0
            &&
            <>
              <br/>
              <h4>Conjuros</h4>
            </>
          }
          <ul>
            {
              clase?.spells?.map(spell => (
                <li>{spell.name}</li>
              ))
            }
          </ul>
          
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
                        label={proficiency_options[select]?.name.split(' - ')[1] ?? proficiency_options[select]?.name ?? ''}
                        options={proficiency_options[select]?.options.map(opt => { 
                          return { 
                            index: { index: opt.index, quantity: 1 }, 
                            name: opt.name
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
          {
            subclass?.traits_options
            &&
            <>
              <FormGroup>
                <Label for="exampleSelect">
                  {subclass?.traits_options?.name}
                </Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                >
                  {subclass?.traits_options?.options.map(opt => (
                    <option onClick={() => setTrait(opt)}>
                      {opt.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <p>{trait?.desc}</p>
            </>
          }
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
            {
              subclass?.languages?.length > 0
              &&
              <li><b>Idiomas: </b> {subclass?.languages?.map(language => language.name).join(', ')}.</li>
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

          {subclass?.proficiencies.length > 0
            &&
            <>
              <h4>Competencias</h4>
              <ul>
                <TextoCompetencias competencias={subclass?.proficiencies} />
              </ul>
            </>
          }

          {
            subclass?.options?.map((proficiency_options, index) => {
              return (
                <MultiSelect 
                  index={index}
                  label={proficiency_options.type}
                  options={proficiency_options.options}
                  selectedOptions={optionsSubclase}
                  setOptions={setOptionsSubclase}
                  max={proficiency_options?.choose}
                  disabled={disableds}
                  competencias
                />
              )
            })
          }
        </Col>
      </Row>
      <Button color='primary' type="submit">
        Siguiente
      </Button>
    </Form>
  )
}