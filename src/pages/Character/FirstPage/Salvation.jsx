import { Card, CardBody, CardHeader } from "reactstrap";
import { caracteristicas } from "../../../data/data";
import Radio from "../../../components/form/Radio";

export default function Salvation({ character }) {
  const valorHabilidad = (value) => {
    return formatNumber(Math.floor((value/2) - 5))
  }

  function formatNumber(num) {
    return (num >= 0 ? "+" : "") + num.toString();
  }


  return (
    <Card>
      <CardHeader>
        Tiradas de salvacion
      </CardHeader>
      <CardBody>
        {Object.keys(caracteristicas).map((habilidad, index) => {
          const competencia = character?.saving_throws?.includes(habilidad)
          
          return (
            <Radio
              key={index}
              label={valorHabilidad(character.ability_scores_base[habilidad] + (character.ability_bonuses[habilidad] ?? 0) + character.prof_bonus*!!competencia*2) + ' ' + caracteristicas[habilidad]}
              checked={competencia}
              disabled />
          )
        })}
      </CardBody>
    </Card>
  )
}