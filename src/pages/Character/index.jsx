import { Card, CardBody, CardHeader } from "reactstrap";
import Header from "./FirstPage/Header";
import AbilityScores from "./FirstPage/AbilityScores";
import InputText from "../../components/form/Input";
import Salvation from "./FirstPage/Salvation";
import Skills from "./FirstPage/Skills";
import { useEffect, useState } from "react";
import { getClases, getIdiomas, getRazas, getTransfondos } from "../../services/services";
import Profiencies from "./FirstPage/Proficiencies";
import { caracteristicas } from "../../data/data";

export default function Character({ character, habilidades }) {

  const [razas, setRazas] = useState([])
  const [clases, setClases] = useState([])
  const [transfondos, setTransfondos] = useState([])
  const [idiomas, setIdiomas] = useState([])
  
  const tableStyle = {
    width: "100%",
    tableLayout: "fixed"
  };

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

    getIdiomas().then(response => {
      setIdiomas(response)
    })
  }, [])

  const pasiva = (caracteristica) => {
    const base = character?.ability_scores_base[caracteristica] ?? 10
    const bonus = character?.ability_bonuses[caracteristica] ?? 0

    return Math.floor((base + bonus)/2 - 5) + 10
  }

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

  return (
    <Card>
      <CardHeader>
        <Header character={character} clases={clases} transfondos={transfondos} razas={razas} />
      </CardHeader>
      <CardBody>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td rowSpan='8'>
                <AbilityScores abilities={character?.ability_scores_base ?? {}} bonus={character?.ability_bonuses ?? {}} />
              </td>
              <td colSpan="2">
                <InputText label='Inspiracion' value={Math.floor(character?.ability_scores_base?.dex/2 - 5)} disabled />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <InputText label='Bonificador por competencia' value={character?.prof_bonus} disabled />
              </td>
              
            </tr>
            <tr>
              <td colSpan="2" rowSpan='2'>
                <Salvation character={character}/>
              </td>
              
            </tr>
            <tr></tr>
            <tr>
              <td colSpan="2" rowSpan='4'>
                <Skills character={character} habilidades={habilidades}/>
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td colSpan="3">
                <InputText label='Inspiracion' value={pasiva('wis')} disabled />
              </td>
            </tr>
            <tr>
              <td rowSpan='3'>
                <Profiencies character={character} nombreCompetencia={nombreCompetencia} />
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}