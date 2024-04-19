import './CharacterCard.css'

export default function CharacterCard({ character }) {
  return (
    <div className="character-card">
      
      <div className="character-name">
        <strong>Nombre del personaje</strong><br/>{character?.nombre}
      </div>
      <div className="character-info">
        <div className="grid-item">
          <strong>Clase y nivel:{"\u00A0"}</strong>{character?.nivel}
        </div>
        <div className="grid-item">
          <strong>Transfondo:{"\u00A0"}</strong>{character?.background}
        </div>
        <div className="grid-item">
          <strong>Nombre del jugador:{"\u00A0"}</strong>{character?.playerName}
        </div>
        <div className="grid-item">
          <strong>Raza:{"\u00A0"}</strong>{character?.raza} {character?.subraza ? ' / ' + character?.subraza : ''}
        </div>
        <div className="grid-item">
          <strong>Alineamiento:{"\u00A0"}</strong>{character?.alignment}
        </div>
        <div className="grid-item">
          <strong>Puntos de experiencia:{"\u00A0"}</strong>{character?.experiencePoints} XP
        </div>
      </div>
  </div>
  )
}