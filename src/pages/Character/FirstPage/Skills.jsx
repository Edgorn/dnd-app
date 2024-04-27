import { Card, CardBody, CardHeader } from "reactstrap";
import CheckBox from "../../../components/form/CheckBox";
import { caracteristicas } from "../../../data/data";

export default function Skills({ character, habilidades }) {
  const valorHabilidad = (value) => {
    return formatNumber(Math.floor((value/2) - 5))
  }

  function formatNumber(num) {
    return (num >= 0 ? "+" : "") + num.toString();
  }

  return (
    <Card>
      <CardHeader>
        Habilidades
      </CardHeader>
      <CardBody>
        {habilidades.map(habilidad => {
          return (
            <CheckBox
              label={valorHabilidad(character.abilityScores[habilidad.ability_score]) + ' ' + habilidad.name + ' (' + caracteristicas[habilidad.ability_score] + ')'}
              checked={false}
              disabled />
          )
        })}
      </CardBody>
    </Card>
  )
}