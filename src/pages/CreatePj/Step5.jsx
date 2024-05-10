import { Button, Form } from "reactstrap";
import { caracteristicas } from "../../data/data";
import Ability from "../../components/form/Ability";
import { useState } from "react";

export default function Step5({ character, cambiarStep, anteriorStep, nombreCompetencia }) {
  const [abilityScores, setAbilityScores] = useState(character.ability_scores_base)
  
  const aumentarHabilidad = (caracteristica) => {
    const abilityAux = { ...abilityScores }
    abilityAux[caracteristica]++
    setAbilityScores(abilityAux)
  }

  const disminuirHabilidad = (caracteristica) => {
    const abilityAux = { ...abilityScores }
    abilityAux[caracteristica]--
    setAbilityScores(abilityAux)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    cambiarStep({
      ability_scores_base: abilityScores
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(caracteristicas).map(caracteristica => (
        <Ability
          key={caracteristica}
          id={caracteristica}
          name={caracteristicas[caracteristica]}
          value={abilityScores[caracteristica] ?? 10}
          bonus={character?.ability_bonuses[caracteristica] ?? 0}
          increase={aumentarHabilidad}
          decrease={disminuirHabilidad} />
      ))}

      <Button color='secondary' onClick={anteriorStep}>
        Anterior
      </Button>
      
      <Button color='primary'>
        Siguiente
      </Button>
    </Form>
  )
}