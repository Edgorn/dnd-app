import { useState } from "react"

function useCreatePj() {
  const [character, setCharacter] = useState({
    level: 1,
    experiencePoints: 0,
    name: 'David Bisbal',
    playerName: 'Edgar Maronda Carrion',
    appearance: {
      age: 0,
      height: 0,
      weight: 0,
      eyes: '',
      skin: '',
      heir: ''
    },
    alignment: '',
    race: '',
    subrace: '',
    type: '',
    ability_scores_base: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    },
    ability_bonuses: {},
    skills: [],
    dobleSkills: [],
    languages: [],
    proficiencies: [],
    spells: [],
    prof_bonus: 0,
    background: '',
    money: 0,
    raceData: { },
    classData: { },
    backgroundData: { }
  })

  const addData = (data) => {
    const characterAux = { ...character }

    Object.keys(data).forEach(key => {
      characterAux[key] = data[key]
    })

    calcularDatos(characterAux)
  }

  const calcularDatos = (characterAux) => {
    
    const skills = [...characterAux?.raceData?.skills ?? [], ...characterAux?.classData?.skills ?? [], ...characterAux?.backgroundData?.skills ?? []]
    characterAux.skills = skills
    
    const languages = [...characterAux?.raceData?.languages ?? [], ...characterAux?.classData?.languages ?? [], ...characterAux?.backgroundData?.languages ?? []]
    characterAux.languages = languages

    const proficiencies = [...characterAux?.raceData?.proficiencies ?? [], ...characterAux?.classData?.proficiencies ?? [], ...characterAux?.backgroundData?.proficiencies ?? []]
    characterAux.proficiencies = proficiencies
    
    const spells = [...characterAux?.raceData?.spells ?? [], ...characterAux?.classData?.spells ?? [], ...characterAux?.backgroundData?.spells ?? []]
    characterAux.spells = spells

    const money = characterAux?.classData?.money
    characterAux.money = money

    setCharacter(characterAux)
  }

  return { character, addData }
}

export default useCreatePj