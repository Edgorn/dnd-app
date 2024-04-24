import { Col, Progress, Row } from "reactstrap";
import { alineamientos, level } from "../../../data/data";

export default function Header({character, clases, transfondos, razas}) {
  const nombreClase = () => {
    const clase = clases?.find(clase => clase.index === character.class)
    return clase?.name ?? character?.class
  }

  const nombreTransfondo = () => {
    const transfondo = transfondos?.find(transfondo => transfondo.index === character.background)
    return transfondo?.name ?? character?.background
  } 
  
  const nombreRaza = () => {
    const raza = razas?.find(raza => raza.index === character.race)
    const subraza = raza?.subraces?.find(raza => raza.index === character.subrace)
    
    return subraza?.name ?? raza?.name ?? character?.race
  }

  const nombreAlineamiento = () => {
    const alineamiento = alineamientos.find(alineamiento => alineamiento.index === character.alignment)
    return alineamiento?.name ?? character?.alignment
  }

  const tableStyle = {
    width: "100%", // Hace que la tabla use todo el ancho disponible
    tableLayout: "fixed" // Fuerza a que las celdas tengan un ancho uniforme
  };

  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td rowSpan="2" colSpan='3'>
              <strong>Nombre del personaje</strong><br/>{character?.name}
            </td>
            <td colSpan="2">
              <strong>Clase y nivel:{"\u00A0"}</strong>{nombreClase() + ' ' + character?.level}
            </td>
            <td colSpan="2">
              <strong>Transfondo:{"\u00A0"}</strong>{nombreTransfondo()}
            </td>
            <td colSpan="2">
              <strong>Nombre del jugador:{"\u00A0"}</strong>{character?.playerName}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <strong>Raza:{"\u00A0"}</strong>{nombreRaza()}
            </td>
            <td colSpan="2">
              <strong>Alineamiento:{"\u00A0"}</strong>{nombreAlineamiento()}
            </td>
            <td colSpan="2">
              <Row>
                <Col>
                  <strong>Experiencia:</strong>
                </Col>
                <Col>
                <Progress
                  className="my-2"
                  style={{
                    height: '3px'
                  }}
                  max={level[character?.level - 1]}
                  value={character?.experiencePoints} />

                <div className="text-center">
                  {level[character?.level - 1] === 0 ? 'MAX' : character?.experiencePoints + '/' + level[character?.level - 1]}
                </div>
                </Col>
              </Row>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
  )
}