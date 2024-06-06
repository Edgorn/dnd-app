import { Button, ButtonGroup, Col, Form, Row } from "reactstrap";
import { Fragment, useEffect, useState } from "react";
import { getClases } from "../../services/services";
import TextoCompetencias from "../../components/form/TextoCompetencias";
import Imagen from "../../components/Imagen";
import TextoPuntosGolpe from "../../components/form/TextoPuntosGolpe";
import MultiSelect from "../../components/form/MultiSelect";
import InputText from "../../components/form/Input";

export default function StepClases({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  const [clase, setClase] = useState([])
  const [clases, setClases] = useState([])
  const [optionsClase, setOptionsClase] = useState([])
  const [optionsEquipment, setOptionsEquipment] = useState([])
  const [optionsConjuros, setOptionsConjuros] = useState([])
  const [pack, setPack] = useState('')

  const disableds = [
    ...character?.raceData?.skills?.map(skill => { return { index: skill } }) ?? []
  ]

  useEffect(() => {
    getClases().then(response => {
      setClases(response)
      setClase(response.find(r => r.index === character.class) ?? response[0] ?? null)
    })
  }, [character.class])

  
  useEffect(() => {
    setOptionsClase(clase?.options?.map(() => []))
    setOptionsEquipment(clase?.equipment_options?.map(() => []))
    setOptionsConjuros(clase?.spellcasting_options?.map(() => []))
    setPack('')
  }, [clase])

  const seleccionarClase = (nombre) => {
    setClase(clases.find(r => r.index === nombre))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formData = new FormData(evt.target);

    let money = formData.get('money');

    const equipment = clase.equipment.map(eq => { return { index: eq.index, quantity: eq.quantity } })
    const spells = []

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
      const values = optionsEquipment[index]?.map(opt => opt.value) ?? []
      const arrayValues = values.map(v => { return { index: v.split('_')[0], quantity: parseInt(v.split('_')[1]) } })

      equipment.push(...arrayValues)
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
      classData: {
        proficiencies,
        skills,
        spells,
        money
      },
      equipment
    })
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
              return (
                <MultiSelect 
                  index={index}
                  label={proficiency_options?.type ?? ''}
                  options={proficiency_options.options.map(opt => { 
                    return { 
                      index: { index: opt.index, quantity: opt.quantity }, 
                      name: opt.name.map((name, index) => {
                        return opt.quantity[index] + 'x ' + name 
                      })
                      .join(' - ')
                    } 
                  })}
                  selectedOptions={optionsEquipment}
                  setOptions={setOptionsEquipment}
                  max={proficiency_options?.choose}
                  disabled={disableds}
                />
              )
            })
          }
          
          <br/>
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
      <Button color='primary' type="submit">
        Siguiente
      </Button>
      {/*}
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
    */}
    </Form>
  )
}