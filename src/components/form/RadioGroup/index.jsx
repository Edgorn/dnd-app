import { useState } from "react";
import CheckBox from "../CheckBox";

export default function RadioGroup({ datos, habilidades }) {
  const [options, setOptions] = useState([])

  const name = (index, type) => {
    if (type === 'skill') {
      return habilidades.find(habilidad => habilidad.index === index)?.name ?? index
    }

    return index
  }

  const handleChange = (event) => {
    const { name } = event.target;
    const datosAux = datos.options.map(o => o.index)
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
            if (name(a.index, a.type) < name(b.index, b.type)) {
              return -1;
            }
            if (name(a.index, a.type) > name(b.index, b.type)) {
              return 1;
            }
            return 0;
          })
          ?.map((option, index) => 
            <CheckBox 
              key={index}
              label={name(option.index, option.type)}
              name={option.index}
              onChange={handleChange}
              checked={!!options.find(o => o === option.index)} />
          )
      }
    </div>
  )
}