import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { caracteristicas } from "../../../data/data";

export default function AbilityScores({ abilities, bonus }) {
  const tableStyle = {
    width: "100%", // Hace que la tabla use todo el ancho disponible
    tableLayout: "fixed", // Fuerza a que las celdas tengan un ancho uniforme
    textAlign: "center"
  };

  const valorHabilidad = (value) => {
    return formatNumber(Math.floor(value/2 - 5))
  }

  function formatNumber(num) {
    return (num >= 0 ? "+" : "") + num.toString();
  }

  return (
    <Card>
      <CardBody>
        <table style={tableStyle}>
          {Object.keys(abilities).map(ability => {
            return (
              <tr key={ability}><td>
                <Card>
                  <CardHeader style={{fontSize: '.6em'}}>
                    {caracteristicas[ability]}
                  </CardHeader>
                  <CardBody>
                    {valorHabilidad(abilities[ability] + (bonus[ability] ?? 0))}
                  </CardBody>
                  <CardFooter>
                    {abilities[ability] + (bonus[ability] ?? 0)}
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