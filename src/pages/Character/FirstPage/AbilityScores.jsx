import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { habilidades } from "../../../data/data";

export default function AbilityScores({ abilities }) {
  const tableStyle = {
    width: "100%", // Hace que la tabla use todo el ancho disponible
    tableLayout: "fixed" // Fuerza a que las celdas tengan un ancho uniforme
  };

  return (
    <Card>
      <CardBody>
        <table style={tableStyle}>
          {Object.keys(abilities).map(ability => {
            return (
              <tr key={ability}><td>
                <Card>
                  <CardHeader>
                    {habilidades[ability]}
                  </CardHeader>
                  <CardBody>
                    {abilities[ability]}
                  </CardBody>
                  <CardFooter>
                    asd
                  </CardFooter>
                </Card>
              </td></tr>
            )
          })}
        </table>
      </CardBody>
    </Card>
  )
}