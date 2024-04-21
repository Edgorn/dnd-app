// Ejemplo en src/App.js o cualquier otro archivo de componente
import React, { useEffect, useState } from 'react'; // Asegúrate de importar el CSS donde has incluido Tailwind
import './App.css';
import { getClases, getRazas, getTransfondos } from './services/services';
import CharacterCard from './components/CharacterCard';

const habilidades = {
  str: 'Fuerza',
  dex: 'Destreza',
  con: 'Constitucion',
  int: 'Inteligencia',
  wis: 'Sabiduria',
  cha: 'Carisma'
}

const alineamientos = [
  {"index":"chaotic-evil","name":"Caótico malvado"},
  {"index":"chaotic-good","name":"Caótico bueno"},
  {"index":"chaotic-neutral","name":"Caótico neutral"},
  {"index":"lawful-evil","name":"Legal malvado"},
  {"index":"lawful-good","name":"Legal bueno"},
  {"index":"lawful-neutral","name":"Legal neutral"},
  {"index":"neutral","name":"Neutral"},
  {"index":"neutral-evil","name":"Neutral malvado"},
  {"index":"neutral-good","name":"Neutral bueno"}
]

function App() {
  const [character, setCharacter] = useState({
    name: '',
    race: '',
    subrace: '',
    level: 1,
    class: '',
    background: '',
    alignment: '',
    experiencePoints: 0,
    abilityScores: {
      str: 30,
      dex: 30,
      con: 30,
      int: 30,
      wis: 30,
      cha: 30
    }
  })

  const [razas, setRazas] = useState([])
  const [subrazas, setSubrazas] = useState([])
  const [clases, setClases] = useState([])
  const [transfondos, setTransfondos] = useState([])

  useEffect(() => {
    getRazas().then(response => {
      setRazas(response)
    })

    getClases().then(response => {
      setClases(response)
    })

    getTransfondos().then(response => {
      setTransfondos(response)
    })
  }, []);

  const cambioRaza = (event) => {
    const characterAux = {...character}
    const razaSeleccionada = razas.find(raza => raza.index === event.target.value)
    
    characterAux.race = razaSeleccionada?.index ?? ''
    characterAux.subrace = razaSeleccionada?.subraces[0]?.index ?? ''

    setSubrazas(razaSeleccionada?.subraces ?? []);
    setCharacter(characterAux)
  };

  const cambioSubraza = (event) => {
    const subrazaSeleccionada = subrazas.find(subraza => subraza.index === event.target.value)
    setCharacter({...character, subrace: subrazaSeleccionada?.index ?? ''})
  };

  const cambioClase = (event) => {
    const claseSeleccionado = clases.find(clase => clase.index === event.target.value)
    setCharacter({...character, class: claseSeleccionado?.index ?? ''})
  };

  const cambioNombre = (event) => {
    setCharacter({...character, name: event.target.value})
  }
  
  const cambioTransfondo = (event) => {
    setCharacter({...character, background: event.target.value})
  }  

  const cambioAlineamiento = (event) => {
    setCharacter({...character, alignment: event.target.value})
  }

  const valorHabilidad = (index) => {
    const valor = character.abilityScores[index] / 2
    console.log(valor)
    return index
  }

  return (
    <div className="container">
      <div className="column column-small">
        <input type="text" className="full-width" value={character?.name ?? ''} onChange={cambioNombre} placeholder="Nombre del personaje" />

        <select value={character?.race ?? ''} onChange={cambioRaza} className='full-width'>
          <option key='' value=''>-</option>
          {razas.map(raza => (
            <option key={raza.index} value={raza.index}>
              {raza.name}
            </option>
          ))}
        </select>

        <select value={character?.subrace ?? ''} onChange={cambioSubraza} className='full-width'>
          {subrazas.map(subraza => (
            <option key={subraza.index} value={subraza.index}>
              {subraza.name}
            </option>
          ))}
        </select>

        <select value={character?.class ?? ''} onChange={cambioClase} className='full-width'>
          <option key='' value=''>-</option>
          {clases.map(clase => (
            <option key={clase.index} value={clase.index}>
              {clase.name}
            </option>
          ))}
        </select>

        <select value={character?.background ?? ''} onChange={cambioTransfondo} className='full-width'>
          <option key='' value=''>-</option>
          {transfondos.map(transfondo => (
            <option key={transfondo.index} value={transfondo.index}>
              {transfondo.name}
            </option>
          ))}
        </select>

        <select value={character?.alignment ?? ''} onChange={cambioAlineamiento} className='full-width'>
          <option key='' value=''>-</option>
          {alineamientos.map(alineamiento => (
            <option key={alineamiento.index} value={alineamiento.index}>
              {alineamiento.name}
            </option>
          ))}
        </select>

        {Object.keys(habilidades).map(habilidad => (
          <div>
            {habilidades[habilidad]}
            <input type="number" className="full-width" value={character.abilityScores[habilidad] ?? 10} min={1} max={30} />
            <div>{character.abilityScores[habilidad]} ({valorHabilidad(habilidad)})</div>
          </div>
        ))}
        
      </div>
      <div className="column column-large">
        <CharacterCard character={character} razas={razas} clases={clases} transfondos={transfondos} alineamientos={alineamientos} />
      </div>
    </div>
  );
}

export default App;