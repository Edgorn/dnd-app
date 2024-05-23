export default function TextoCompetencias({competencias, nombreCompetencia}) {

  return (
    <>
      {
        competencias?.filter(prof => prof.type === 'habilidad')?.length > 0
        &&
        <li>
          {'Competencias con habilidades: ' +  competencias?.filter(prof => prof.type === 'habilidad')?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')}
        </li>
      }

      {
        competencias?.filter(prof => prof.type === 'arma')?.length > 0
        &&
        <li>{'Competencias con armas: ' +  competencias?.filter(prof => prof.type === 'arma')?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')}</li>
      }

      {
        competencias?.filter(prof => prof.type === 'armadura')?.length > 0
        &&
        <li>{'Competencias con armaduras: ' +  competencias?.filter(prof => prof.type === 'armadura')?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')}</li>
      }

      {
        competencias?.filter(prof => prof.type === 'herramienta')?.length > 0
        &&
        <li>{'Competencias con herramientas: ' +  competencias?.filter(prof => prof.type === 'herramienta')?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')}</li>
      }

      {
        competencias?.filter(prof => prof.type === 'vehiculo')?.length > 0
        &&
        <li>{'Competencias con vehiculos: ' +  competencias?.filter(prof => prof.type === 'vehiculo')?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')}</li>
      }

      {
        competencias?.filter(prof => prof.type !== 'habilidad' && prof.type !== 'arma' && prof.type !== 'armadura' && prof.type !== 'herramienta' && prof.type !== 'vehiculo')?.length > 0
        &&
        <li>{'OTRO: ' +  competencias?.filter(prof => prof.type !== 'habilidad' && prof.type !== 'arma' && prof.type !== 'armadura' && prof.type !== 'herramienta' && prof.type !== 'vehiculo')?.map(prof => nombreCompetencia(prof.index, prof.type)).join(', ')}</li>
      }

    </>
  )
}