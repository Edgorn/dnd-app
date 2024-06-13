import { useEffect, useState } from "react"
import { getCompetencias, getConjuros, getHabilidades, getIdiomas, rellenarFicha } from "../../services/services"
import useCreatePj from "../../hooks/useCreatePj";
import { caracteristicas } from "../../data/data";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import Character from "../Character";
import Step1 from "./Step1";
import Step2 from "./StepRaza";
import Step3 from "./StepClase";
import Step4 from "./Step4";
import Step5 from "./Step5";
import StepAspecto from "./StepAspecto";

export default function CreatePj() {
  const [habilidades, setHabilidades] = useState([])
  const [idiomas, setIdiomas] = useState([])
  const [competencias, setCompetencias] = useState([])
  const [conjuros, setConjuros] = useState([])

  const [step, setStep] = useState(0)

  const { character, addData } = useCreatePj()

  useEffect(() => {
    getHabilidades().then(response => {
      setHabilidades(response)
    })

    getIdiomas().then(response => {
      setIdiomas(response)
    })

    getCompetencias().then(response => {
      setCompetencias(response)
    })

    getConjuros().then(response => {
      setConjuros(response)
    })
  }, []);

  const nombreCompetencia = (index, type) => {
    if (type === 'habilidad') {
      return habilidades.find(habilidad => habilidad.index === index)?.name ?? index
    } else if (type === 'caracteristica') {
      return caracteristicas[index] ?? index
    } else if (type === 'idioma') {
      return idiomas.find(idioma => idioma.index === index)?.name ?? index
    } else if (type === 'arma' || type === 'herramienta' || type === 'armadura' || type === 'instrumento' || type === 'juego' || type === 'vehiculo') {
      return competencias.find(competencia => competencia.index === index)?.name ?? index
    } else if (type.split('_')[0] === 'conjuro') {
      const arrayConjuro = index.split('_')
      
      if (arrayConjuro.length > 1) {
        const name = conjuros.find(conjuro => conjuro.index === arrayConjuro[0])?.name ?? index
        
        if (arrayConjuro[1] === 'magia-drow') {
          return name + ' (Magia Drow)'
        } else {
          return name + ' (' + caracteristicas[arrayConjuro[1]] + ')'
        }
      } else {
        return conjuros.find(conjuro => conjuro.index === index)?.name ?? index
      }
    }

    return index
  }

  const cambiarStep = (data) => {
    addData(data)
    setStep(step+1)
  }

  const anteriorStep = () => {
    setStep(step-1)
  }

  const crearPersonaje = () => {
    rellenarFicha(character).then(response => {
      const file = window.URL.createObjectURL(response);
      window.open(file, '_blank');
    })
  }

  return (
    <div className='p-1'>
      <Row>
        <Col className="col-4 px-3">
          <Card>
            <CardBody>
              { step === 0 && <Step1 character={character} cambiarStep={cambiarStep} /> }
              { step === 1 && <Step2 character={character} cambiarStep={cambiarStep} anteriorStep={anteriorStep} nombreCompetencia={nombreCompetencia} /> }
              { step === 2 && <StepAspecto appearance={character?.appearance} cambiarStep={cambiarStep} anteriorStep={anteriorStep} /> }
              { step === 3 && <Step3 character={character} cambiarStep={cambiarStep} nombreCompetencia={nombreCompetencia} anteriorStep={anteriorStep} /> }
              { step === 4 && <Step4 character={character} cambiarStep={cambiarStep} nombreCompetencia={nombreCompetencia} anteriorStep={anteriorStep} /> }
              { step === 5 && <Step5 character={character} cambiarStep={cambiarStep} nombreCompetencia={nombreCompetencia} anteriorStep={anteriorStep} /> }
              
              <Button onClick={crearPersonaje}>
                PDF
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col className="col-8 px-3">
          <Character character={character} habilidades={habilidades} />
        </Col>
      </Row>
    </div>
  );
}