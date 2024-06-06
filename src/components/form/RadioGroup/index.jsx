import { useState } from "react";
import CheckBox from "../CheckBox";
import { caracteristicas } from "../../../data/data";

export default function RadioGroup({ datos, nombreCompetencia, disableds }) {
  const [options, setOptions] = useState([])

  const handleChange = (event) => {
    const { name } = event.target;

    const datosAux = datos.options.map(o => datos.type + '_' + o)
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

  const arrayNombre = datos?.type?.split('_') 
  
  return (
    <div>
      <p>Elige {datos?.choose} {arrayNombre[1] ? arrayNombre[0] + ' (' + caracteristicas[arrayNombre[1]] + ')' : datos?.type} de entre estas opciones:</p>
      {
        datos?.options
          ?.map((option, index) => 
            <CheckBox 
              key={index}
              label={option.name}
              name={datos.type + '_' + option.index}
              onChange={handleChange}
              checked={!!options.find(o => o === datos.type + '_' + option.index)}
              disabled={disableds.includes(option.index) && !options.includes(option.index)} />
          )
      }
    </div>
  )
}