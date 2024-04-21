import './CharacterCard.css'

const level = [300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000, 0]

export default function CharacterCard({ character, razas, clases, transfondos, alineamientos }) {

  const nombreRaza = () => {
    const raza = razas.find(raza => raza.index === character.race)
    const subraza = raza?.subraces?.find(raza => raza.index === character.subrace)
    
    return subraza?.name ?? raza?.name ?? character?.race
  }

  const nombreClase = () => {
    const clase = clases.find(clase => clase.index === character.class)
    
    return clase?.name ?? character?.class
  }

  const nombreTransfondo = () => {
    const transfondo = transfondos.find(transfondo => transfondo.index === character.background)
    
    return transfondo?.name ?? character?.background
  }

  const nombreAlineamiento = () => {
    const alineamiento = alineamientos.find(alineamiento => alineamiento.index === character.alignment)
    
    return alineamiento?.name ?? character?.alignment
  }

  return (
    <div className="character-card">
      <div className="character-name">
        <strong>Nombre del personaje</strong><br/>{character?.name}
      </div>
      <div className="character-info">
        <div className="grid-item">
          <strong>Clase y nivel:{"\u00A0"}</strong>{nombreClase() + ' ' + character?.level}
        </div>
        <div className="grid-item">
          <strong>Transfondo:{"\u00A0"}</strong>{nombreTransfondo()}
        </div>
        <div className="grid-item">
          <strong>Nombre del jugador:{"\u00A0"}</strong>{character?.playerName}
        </div>
        <div className="grid-item">
          <strong>Raza:{"\u00A0"}</strong>{nombreRaza()} {character?.subraza ? ' / ' + character?.subraza : ''}
        </div>
        <div className="grid-item">
          <strong>Alineamiento:{"\u00A0"}</strong>{nombreAlineamiento()}
        </div>
        <div className="grid-item">
          <strong>Experiencia:{"\u00A0"}</strong>
          <div>
            <progress value={character?.experiencePoints} max={level[character?.level - 1]}></progress>
            <span>{level[character?.level - 1] === 0 ? 'MAX' : character?.experiencePoints + '/' + level[character?.level - 1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}