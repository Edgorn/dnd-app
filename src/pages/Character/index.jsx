import { Card, CardBody, CardHeader } from "reactstrap";
import Header from "./FirstPage/Header";
import AbilityScores from "./FirstPage/AbilityScores";

export default function Character({ character, clases, transfondos, razas }) {
  
  const tableStyle = {
    width: "100%", // Hace que la tabla use todo el ancho disponible
    tableLayout: "fixed" // Fuerza a que las celdas tengan un ancho uniforme
  };

  console.log(character)

  return (
    <Card>
      <CardHeader>
        <Header character={character} clases={clases} transfondos={transfondos} razas={razas} />
      </CardHeader>
      <CardBody>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td>
                <AbilityScores abilities={character?.abilityScores ?? []} />
              </td>
              <td colSpan="2">1</td>
              <td colSpan="3">1</td>
              <td colSpan="3">1</td>
            </tr>
            
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}