import { useEffect, useState } from "react"
import { alineamientos } from "../data/data";

function useCreatePj({ razas, clases, transfondos }) {
  const [character, setCharacter] = useState({
    name: '',
    race: '',
    subrace: '',
    level: 1,
    class: '',
    background: '',
    alignment: alineamientos[0]?.index ?? '',
    experiencePoints: 0,
    abilityScores: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    },
    prof_bonus: 0,
    auxScores: []
  })
  const [subrazas, setSubrazas] = useState([])
  const [proficiencyRace, setProficiencyRace] = useState([])
  const [proficiencyOptionsRace, setProficiencyOptionsRace] = useState([])
  const [proficiencySubrace, setProficiencySubrace] = useState([])
  const [proficiencyOptionsSubrace, setProficiencyOptionsSubrace] = useState([])
  const [proficiencyOptionsClass, setProficiencyOptionsClass] = useState([])
  const [proficiencyBackground, setProficiencyBackground] = useState([])

  useEffect(() => {
    if (razas.length > 0) {
      setCharacter({
        ...character,
        race: razas[0]?.index ?? '',
        subrace: razas[0]?.subraces[0]?.index ?? ''
      })
      
      setSubrazas(razas[0]?.subraces ?? []);
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
      const subrazaSeleccionada = razaSeleccionada?.subraces[0]
      setSubrazas(razaSeleccionada?.subraces ?? []);
      setCharacter({
        ...character,
        subrace: subrazaSeleccionada?.index ?? ''
      })

      setProficiencyRace(razaSeleccionada.starting_proficiencies ?? [])
      setProficiencyOptionsRace(razaSeleccionada?.starting_proficiency_options ?? undefined)

      setProficiencySubrace(subrazaSeleccionada?.starting_proficiencies ?? [])
      setProficiencyOptionsSubrace(subrazaSeleccionada?.starting_proficiency_options ?? undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.race])

  useEffect(() => {
    const razaSeleccionada = razas?.find(raza => raza.index === character.race)

    if (razaSeleccionada) {
      const subrazaSeleccionada = razaSeleccionada?.subraces.find(raza => raza.index === character.subrace)
      setProficiencySubrace(subrazaSeleccionada?.starting_proficiencies ?? [])
      setProficiencyOptionsSubrace(subrazaSeleccionada?.starting_proficiency_options ?? undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.subrace])

  useEffect(() => {
    const claseSeleccionada = clases?.find(clase => clase.index === character.class)

    if (claseSeleccionada) {
      setCharacter({
        ...character,
        prof_bonus: claseSeleccionada?.levels?.find(level => level.level === character.level)?.prof_bonus ?? 0
      })

      setProficiencyOptionsClass(claseSeleccionada?.proficiency_options ?? [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.class, character.level])

  useEffect(() => {
    const transfondo = transfondos.find(trans => trans.index === character.background)

    setProficiencyBackground(transfondo?.starting_proficiencies ?? [])
  }, [character.background])


  const cambioValor = (variable, valor) => {
    const characterAux = {...character}

    characterAux[variable] = valor
    setCharacter(characterAux)
  }

  const cambioClase = (valor) => {
    const claseSeleccionada = clases.find(clase => clase.index === valor)
    setCharacter({...character, class: claseSeleccionada?.index ?? ''})
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

  const datosHoja = () => {
    const abilityScores = character.abilityScores
    const clase = clases.find(clase => clase.index === character.class)

    const datos = {
      ...character,
      abilityScores: {
        str: abilityScores['str'] + bonusHabilidad('str'),
        dex: abilityScores['dex'] + bonusHabilidad('dex'),
        con: abilityScores['con'] + bonusHabilidad('con'),
        int: abilityScores['int'] + bonusHabilidad('int'),
        wis: abilityScores['wis'] + bonusHabilidad('wis'),
        cha: abilityScores['cha'] + bonusHabilidad('cha')
      },
      saving_throws: clase?.saving_throws ?? []
    }

    return datos
  }

  return { 
    character, subrazas, proficiencyOptionsClass, proficiencyRace, proficiencyOptionsRace, proficiencySubrace, proficiencyOptionsSubrace, proficiencyBackground,
    cambioClase, aumentarHabilidad, disminuirHabilidad, bonusHabilidad, cambioValor, datosHoja 
  }
}

export default useCreatePj