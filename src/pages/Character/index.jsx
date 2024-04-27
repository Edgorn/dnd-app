import { Card, CardBody, CardHeader } from "reactstrap";
import Header from "./FirstPage/Header";
import AbilityScores from "./FirstPage/AbilityScores";
import InputText from "../../components/form/Input";
import Salvation from "./FirstPage/Salvation";
import Skills from "./FirstPage/Skills";

export default function Character({ character, clases, transfondos, razas, habilidades }) {
  
  const tableStyle = {
    width: "100%", // Hace que la tabla use todo el ancho disponible
    tableLayout: "fixed" // Fuerza a que las celdas tengan un ancho uniforme
  };
/*
  const cellStyle = {
    height: "50px", // Altura fija para cada celda
    textAlign: "center" // Centra el contenido en cada celda
  };*/

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
                <AbilityScores abilities={character?.abilityScores ?? []} />
              </td>
              <td colSpan="2">
                <InputText label='Inspiracion' value={Math.floor(character.abilityScores.dex/2 - 5)} disabled />
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
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}