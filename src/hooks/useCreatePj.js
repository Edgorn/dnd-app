import { useState } from "react"

function useCreatePj() {
  const [character, setCharacter] = useState({
    level: 1,
    experiencePoints: 0,
    name: '',
    alignment: '',
    race: '',
    subrace: '',
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
    prof_bonus: 0,
    background: ''
  })

  const addData = (data) => {
    const characterAux = { ...character }

    Object.keys(data).forEach(key => {
      if (key === 'skills') {
        characterAux[key] = characterAux[key].concat(data[key])
      } else {
        characterAux[key] = data[key]
      }
    })

    setCharacter(characterAux)
  }

  return { character, addData }
}

export default useCreatePj