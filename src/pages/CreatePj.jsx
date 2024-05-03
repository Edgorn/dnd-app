import { useEffect, useState } from "react"
import { getClases, getHabilidades, getRazas, getTransfondos } from "../services/services"
import './CreatePj.css';
import useCreatePj from "../hooks/useCreatePj";
import { alineamientos, caracteristicas } from "../data/data";
import Input from "../components/form/Input";
import { Card, CardBody, Col, Row } from "reactstrap";
import Select from "../components/form/Select";
import Ability from "../components/form/Ability";
import Character from "./Character";
import RadioGroup from "../components/form/RadioGroup";

export default function CreatePj() {
  const [razas, setRazas] = useState([])
  const [clases, setClases] = useState([])
  const [transfondos, setTransfondos] = useState([])
  const [habilidades, setHabilidades] = useState([])

  const { 
    character, subrazas, proficiencyOptionsClass, proficiencyRace, proficiencyOptionsRace, proficiencySubrace, proficiencyOptionsSubrace, proficiencyBackground,
    cambioClase, aumentarHabilidad, disminuirHabilidad, bonusHabilidad, cambioValor, datosHoja 
  } = useCreatePj({ razas, clases, transfondos })

  useEffect(() => {
    getRazas().then(response => {
      setRazas(response)
    })

    getClases().then(response => {
      setClases(response)
    })

    getTransfondos().then(response => {
      setTransfondos(response)
    })

    getHabilidades().then(response => {
      setHabilidades(response)
    })
  }, []);

  const nombreCompetencia = (index, type) => {
    if (type === 'skill') {
      return habilidades.find(habilidad => habilidad.index === index)?.name ?? index
    }

    return index
  }

  return (
    <div className='p-1'>
      <Row>
        <Col className="col-4 px-3">
          <Card>
            <CardBody>
              <Input
                id='name'
                label='Nombre del personaje'
                value={character?.name ?? ''}
                onChange={(valor) => cambioValor('name', valor)} />

              <Select
                id='race' 
                label='Raza' 
                options={razas} 
                value={character?.race ?? ''} 
                onChange={(valor) => cambioValor('race', valor)} />

              { 
                proficiencyRace.length > 0 
                && 
                (
                  'Competencia: ' +
                  proficiencyRace
                    .map(prof => nombreCompetencia(prof.index, prof.type))
                    .join(', ')
                )
              }

              {
                proficiencyOptionsRace &&
                <RadioGroup
                  datos={proficiencyOptionsRace}
                  habilidades={habilidades} />
              }

              <Select 
                id='subrace' 
                label='Subraza' 
                options={subrazas} 
                value={character?.subrace ?? ''} 
                onChange={(valor) => cambioValor('subrace', valor)} 
                hidden={subrazas?.length === 0} />

              { 
                proficiencySubrace.length > 0 
                && 
                (
                  'Competencia: ' +
                  proficiencySubrace
                    .map(prof => nombreCompetencia(prof.index, prof.type))
                    .join(', ')
                )
              }

              {
                proficiencyOptionsSubrace &&
                <RadioGroup
                  datos={proficiencyOptionsSubrace}
                  habilidades={habilidades} />
              }

              <Select
                id='class' 
                label='Clase' 
                options={clases} 
                value={character?.class ?? ''} 
                onChange={cambioClase} />

              {
                proficiencyOptionsClass.map((proficiency_options, index) => 
                  <RadioGroup 
                    key={index}
                    datos={proficiency_options}
                    habilidades={habilidades} />
                )
              }

              <Select
                id='background' 
                label='Transfondo' 
                options={transfondos} 
                value={character?.background ?? ''} 
                onChange={(valor) => cambioValor('background', valor)}
                nullable />

              { 
                proficiencyBackground.length > 0 
                && 
                (
                  'Competencia: ' +
                  proficiencyBackground
                    .map(prof => nombreCompetencia(prof.index, prof.type))
                    .join(', ')
                )
              }
                
              <Select
                id='alignment' 
                label='Alineamiento' 
                options={alineamientos} 
                value={character?.alignment ?? ''} 
                onChange={(valor) => cambioValor('alignment', valor)} />

              {Object.keys(caracteristicas).map(caracteristica => (
                <Ability
                  key={caracteristica}
                  id={caracteristica}
                  name={caracteristicas[caracteristica]}
                  value={character.abilityScores[caracteristica] ?? 10}
                  bonus={bonusHabilidad(caracteristica)}
                  increase={aumentarHabilidad}
                  decrease={disminuirHabilidad} />
              ))}
            </CardBody>
          </Card>
        </Col>
        <Col className="col-8 px-3">
          <Character character={datosHoja()} clases={clases} transfondos={transfondos} razas={razas} habilidades={habilidades} />
        </Col>
      </Row>
    </div>
  );
}