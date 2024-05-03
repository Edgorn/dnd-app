import { Card, CardBody, CardHeader } from "reactstrap";
import { caracteristicas } from "../../../data/data";
import Radio from "../../../components/form/Radio";

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
            <Radio
              label={valorHabilidad(character.abilityScores[habilidad.ability_score]) + ' ' + habilidad.name + ' (' + caracteristicas[habilidad.ability_score] + ')'}
              checked={false}
              disabled />
          )
        })}
      </CardBody>
    </Card>
  )
}