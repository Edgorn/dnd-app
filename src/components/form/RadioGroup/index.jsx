import { useState } from "react";
import CheckBox from "../CheckBox";

export default function RadioGroup({ datos, nombreCompetencia, disableds }) {
  const [options, setOptions] = useState([])

  const handleChange = (event) => {
    const { name } = event.target;

    const datosAux = datos.options.map(o => o.type + '_' + o.index)
    let optionsAux = [...options.filter(opt => datosAux.includes(opt))]
    const actualOption = optionsAux.find(option => option === name)

    if (actualOption) {
      optionsAux = optionsAux.filter(option => option !== name)
    } else if (optionsAux.length === datos.choose) {
      return;
    } else {
      optionsAux.push(name)
    }

    setOptions(optionsAux)
  };
  
  return (
    <div>
      <p>Elige {datos?.choose} de entre estas opciones:</p>
      {
        datos?.options
          ?.sort((a, b) => {
            if (nombreCompetencia(a.index, a.type) < nombreCompetencia(b.index, b.type)) {
              return -1;
            }
            if (nombreCompetencia(a.index, a.type) > nombreCompetencia(b.index, b.type)) {
              return 1;
            }
            return 0;
          })
          ?.map((option, index) => 
            <CheckBox 
              key={index}
              label={nombreCompetencia(option.index, option.type)}
              name={option.type + '_' + option.index}
              onChange={handleChange}
              checked={!!options.find(o => o === option.type + '_' + option.index)}
              disabled={disableds.includes(option.index) && !options.includes(option.index)} />
          )
      }
    </div>
  )
}