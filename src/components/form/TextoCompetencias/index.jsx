export default function TextoCompetencias({competencias}) {

  return (
    <>
      {
        competencias?.filter(prof => prof.type === 'habilidad')?.length > 0
        &&
        <li>
          <b>Competencias con habilidades: </b>{competencias?.filter(prof => prof.type === 'habilidad')?.map(prof => prof.name).join(', ')}.
        </li>
      }

      {
        competencias?.filter(prof => prof.type === 'Armas')?.length > 0
        &&
        <li> 
          <b>Competencias con armas: </b>{competencias?.filter(prof => prof.type === 'Armas')?.map(prof => prof.name).join(', ')}.
        </li>
      }

      {
        competencias?.filter(prof => prof.type === 'Armaduras')?.length > 0
        &&
        <li>
          <b>Competencias con armaduras: </b>{competencias?.filter(prof => prof.type === 'Armaduras')?.map(prof => prof.name).join(', ')}.
        </li>
      }

      {
        competencias?.filter(prof => prof.type === 'Herramientas de artesano' || prof.type === 'Otros')?.length > 0
        &&
        <li>
          <b>Competencias con herramientas: </b>{competencias?.filter(prof => prof.type === 'Herramientas de artesano' || prof.type === 'Otros')?.map(prof => prof.name).join(', ')}.
        </li>
      }

      {
        competencias?.filter(prof => prof.type !== 'habilidad' && prof.type !== 'Armas' && prof.type !== 'Armaduras' && prof.type !== 'Herramientas de artesano' && prof.type !== 'Otros')?.length > 0
        &&
        <li>{'OTRO: ' +  competencias?.filter(prof => prof.type !== 'habilidad' && prof.type !== 'Armas' && prof.type !== 'Armaduras' && prof.type !== 'Herramientas de artesano')?.map(prof => prof.index).join(', ')}.</li>
      }

    </>
  )
}