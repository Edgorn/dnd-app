// Ejemplo en src/App.js o cualquier otro archivo de componente
import React, { useEffect, useState } from 'react'; // Asegúrate de importar el CSS donde has incluido Tailwind
import './App.css';
import { getRazas } from './services/services';
import CharacterCard from './components/CharacterCard';

function App() {
  const [character, setCharacter] = useState({
    nombre: 'Edmar Trastamar',
    raza: '',
    subraza: '',
    nivel: 1
  })

  const [razas, setRazas] = useState([])
  const [subrazas, setSubrazas] = useState([])

  useEffect(() => {
    getRazas().then(response => {
      setRazas(response)
    })
  }, []);

  const cambioRaza = (event) => {
    const razaSeleccionada = razas.find(raza => raza.name === event.target.value)
    setCharacter({...character, raza: razaSeleccionada?.name ?? '', subraza: ''})

    if (razaSeleccionada) {
      setSubrazas(razas.find(raza => raza.name === event.target.value).subraces);
    }
  };

  const cambioSubraza = (event) => {
    const subrazaSeleccionada = subrazas.find(subraza => subraza.name === event.target.value)
    setCharacter({...character, subraza: subrazaSeleccionada?.name ?? ''})
  };

  return (
    <div className="container">
      <div className="column column-small">
        <select value={character?.raza ?? ''} onChange={cambioRaza}>
          <option key='' value=''>-</option>
          {razas.map(raza => (
            <option key={raza.name} value={raza.name}>
              {raza.name}
            </option>
          ))}
        </select>

        <select value={character?.subraza ?? ''} onChange={cambioSubraza}>
          <option key='' value=''>-</option>
          {subrazas.map(subraza => (
            <option key={subraza.name} value={subraza.name}>
              {subraza.name}
            </option>
          ))}
        </select>
      </div>
      <div className="column column-large">
        <CharacterCard character={character} />
      </div>
    </div>
  );
}

export default App;