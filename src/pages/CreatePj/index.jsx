import { useEffect, useState } from "react"
import { getHabilidades, getIdiomas } from "../../services/services"
import useCreatePj from "../../hooks/useCreatePj";
import { caracteristicas } from "../../data/data";
import { Card, CardBody, Col, Row } from "reactstrap";
import Character from "../Character";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

export default function CreatePj() {
  const [habilidades, setHabilidades] = useState([])
  const [idiomas, setIdiomas] = useState([])

  const [step, setStep] = useState(0)

  const {  character, addData } = useCreatePj()

  useEffect(() => {
    getHabilidades().then(response => {
      setHabilidades(response)
    })

    getIdiomas().then(response => {
      setIdiomas(response)
    })
  }, []);

  const nombreCompetencia = (index, type) => {
    if (type === 'skill') {
      return habilidades.find(habilidad => habilidad.index === index)?.name ?? index
    } else if (type === 'ability') {
      return caracteristicas[index] ?? index
    } else if (type === 'language') {
      return idiomas.find(idioma => idioma.index === index)?.name ?? index
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

  return (
    <div className='p-1'>
      <Row>
        <Col className="col-4 px-3">
          <Card>
            <CardBody>
              { step === 0 && <Step1 character={character} cambiarStep={cambiarStep} /> }
              { step === 1 && <Step2 character={character} cambiarStep={cambiarStep} anteriorStep={anteriorStep} nombreCompetencia={nombreCompetencia} /> }
              { step === 2 && <Step3 character={character} cambiarStep={cambiarStep} nombreCompetencia={nombreCompetencia} anteriorStep={anteriorStep} /> }
              { step === 3 && <Step4 character={character} cambiarStep={cambiarStep} nombreCompetencia={nombreCompetencia} anteriorStep={anteriorStep} /> }
              { step === 4 && <Step5 character={character} cambiarStep={cambiarStep} nombreCompetencia={nombreCompetencia} anteriorStep={anteriorStep} /> }
              
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