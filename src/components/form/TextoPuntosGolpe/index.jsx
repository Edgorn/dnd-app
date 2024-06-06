export default function TextoPuntosGolpe({hit_die, name}) {

  return (
    <>
      <h4>Puntos de golpe</h4>
      <ul>
        <li>
          <b>Dados de Golpe: </b>{'1d' + hit_die + ' por nivel de '+name}.
        </li>
        <li>
          <b>Puntos de Golpe a nivel 1: </b>{hit_die + ' + tu modificador por Constitución'}.
        </li>
        <li>
          <b>Puntos de Golpe a niveles superiores: </b>{'1d' + hit_die + ' + tu modificador por Constitución por cada nivel de '+name+' por encima del primero'}.
        </li>
      </ul>
    </>
  )
}