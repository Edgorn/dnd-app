import { Card, CardBody, CardHeader } from "reactstrap";
import { caracteristicas } from "../../../data/data";
import Radio from "../../../components/form/Radio";

export default function Skills({ character, habilidades }) {

  const valorHabilidad = (value, proficiency) => {
    return formatNumber(Math.floor((value/2) - 5) + proficiency * character.prof_bonus) ?? 0
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
          const proficiency = character?.skills?.includes(habilidad.index)
          return (
            <Radio
              label={valorHabilidad(character.ability_scores_base[habilidad.ability_score] + (character.ability_bonuses[habilidad.ability_score] ?? 0), proficiency) + ' ' + habilidad.name + ' (' + caracteristicas[habilidad.ability_score] + ')'}
              checked={proficiency}
              disabled />
          )
        })}
      </CardBody>
    </Card>
  )
}