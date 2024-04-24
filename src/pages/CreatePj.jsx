import { useEffect, useState } from "react"
import { getClases, getRazas, getTransfondos } from "../services/services"
import './CreatePj.css';
import useCreatePj from "../hooks/useCreatePj";
import { alineamientos, habilidades } from "../data/data";
import Input from "../components/form/Input";
import { Card, CardBody, Col, Row } from "reactstrap";
import Select from "../components/form/Select";
import Ability from "../components/form/ability";
import Character from "./Character";

export default function CreatePj() {
  const [razas, setRazas] = useState([])
  const [clases, setClases] = useState([])
  const [transfondos, setTransfondos] = useState([])

  const { character, subrazas, cambioClase, aumentarHabilidad, disminuirHabilidad, bonusHabilidad, cambioValor } = useCreatePj({ razas, clases })

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
  }, []);

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

                <Select 
                  id='subrace' 
                  label='Subraza' 
                  options={subrazas} 
                  value={character?.subrace ?? ''} 
                  onChange={(valor) => cambioValor('race', valor)} 
                  hidden={subrazas?.length === 0} />

                <Select
                  id='class' 
                  label='Clase' 
                  options={clases} 
                  value={character?.class ?? ''} 
                  onChange={cambioClase} />

                <Select
                  id='background' 
                  label='Transfondo' 
                  options={transfondos} 
                  value={character?.background ?? ''} 
                  onChange={(valor) => cambioValor('background', valor)}
                  nullable />
                  
                <Select
                  id='alignment' 
                  label='Alineamiento' 
                  options={alineamientos} 
                  value={character?.alignment ?? ''} 
                  onChange={(valor) => cambioValor('alignment', valor)} />

                {Object.keys(habilidades).map(habilidad => (
                  <Ability
                    key={habilidad}
                    id={habilidad}
                    name={habilidades[habilidad]}
                    value={character.abilityScores[habilidad] ?? 10}
                    bonus={bonusHabilidad(habilidad)}
                    increase={aumentarHabilidad}
                    decrease={disminuirHabilidad} />
                ))}
            </CardBody>
          
          </Card>
          
        </Col>
        <Col className="col-8 px-3">
          <Character character={character} clases={clases} transfondos={transfondos} razas={razas} />
        </Col>
      </Row>
    </div>
  );
}