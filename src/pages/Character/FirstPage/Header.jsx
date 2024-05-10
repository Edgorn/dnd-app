import { Progress } from "reactstrap";
import { alineamientos, level } from "../../../data/data";
import InputText from "../../../components/form/Input";

export default function Header({character, clases, transfondos, razas}) {
  const nombreClase = () => {
    const clase = clases?.find(clase => clase.index === character.class)
    return clase?.name ?? character?.class ?? ''
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
    tableLayout: "fixed", // Fuerza a que las celdas tengan un ancho uniforme
    fontSize: '1em'
  };

  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td rowSpan="2" colSpan='3'>
              <InputText label='Nombre del personaje' value={character?.name} disabled/>
            </td>
            <td colSpan="2">
              <InputText label='Clase y nivel' value={nombreClase() + ' ' + character?.level} disabled/>
            </td>
            <td colSpan="2">
              <InputText label='Transfondo' value={nombreTransfondo()} disabled/>
            </td>
            <td colSpan="2">
              <InputText label='Nombre del jugador' disabled/>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <InputText label='Raza' value={nombreRaza()} disabled/>
            </td>
            <td colSpan="2">
              <InputText label='Alineamiento' value={nombreAlineamiento()} disabled/>
            </td>
            <td colSpan="2">
              <div className="text-center">
                {'Experiencia: ' + (level[character?.level - 1] === 0 ? 'MAX' : character?.experiencePoints + '/' + level[character?.level - 1])}
              </div>
              <Progress
                className="my-2"
                style={{
                  height: '3px'
                }}
                max={level[character?.level - 1]}
                value={character?.experiencePoints} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
  )
}