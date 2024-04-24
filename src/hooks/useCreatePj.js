import { useEffect, useState } from "react"
import { alineamientos } from "../data/data";

function useCreatePj({ razas, clases }) {
  const [character, setCharacter] = useState({
    name: '',
    race: '',
    subrace: '',
    level: 1,
    class: '',
    background: '',
    alignment: alineamientos[0]?.index ?? '',
    experiencePoints: 300,
    abilityScores: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    }
  })

  useEffect(() => {
    if (razas.length > 0) {
      setCharacter({
        ...character,
        race: razas[0]?.index ?? '',
        subrace: razas[0]?.subraces[0]?.index ?? ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [razas])

  useEffect(() => {
    if (clases.length > 0) {
      setCharacter({
        ...character,
        class: clases[0]?.index ?? ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clases])

  useEffect(() => {
    const razaSeleccionada = razas?.find(raza => raza.index === character.race)

    if (razaSeleccionada) {
      setSubrazas(razaSeleccionada?.subraces ?? []);
      setCharacter({
        ...character,
        subrace: razaSeleccionada?.subraces[0]?.index ?? ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.race])

  const [subrazas, setSubrazas] = useState([])

  const cambioValor = (variable, valor) => {
    const characterAux = {...character}

    characterAux[variable] = valor
    setCharacter(characterAux)
  }

  const cambioClase = (valor) => {
    const claseSeleccionado = clases.find(clase => clase.index === valor)
    setCharacter({...character, class: claseSeleccionado?.index ?? ''})
  };

  const aumentarHabilidad = (habilidad) => {
    const characterAux = {...character}
    characterAux.abilityScores[habilidad] += 1
    setCharacter(characterAux)
  }

  const disminuirHabilidad = (habilidad) => {
    const characterAux = {...character}
    characterAux.abilityScores[habilidad] -= 1
    setCharacter(characterAux)
  }

  const bonusHabilidad = (habilidad) => {
    const razaSeleccionada = razas.find(race => race.index === character.race)
    const bonusRaza = razaSeleccionada?.ability_bonuses?.find(bonus => bonus.index === habilidad)?.bonus ?? 0

    const subrazaSeleccionada = subrazas.find(subrace => subrace.index === character.subrace)
    const bonusSubraza = subrazaSeleccionada?.ability_bonuses?.find(bonus => bonus.index === habilidad)?.bonus ?? 0

    return bonusRaza + bonusSubraza
  }

  return { character, subrazas, cambioClase, aumentarHabilidad, disminuirHabilidad, bonusHabilidad, cambioValor }
}

export default useCreatePj