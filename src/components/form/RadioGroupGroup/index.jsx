import { useState } from "react";
import CheckBox from "../CheckBox";
import RadioGroup from "../RadioGroup";

export default function RadioGroupGroup({ datos, nombreCompetencia, disableds }) {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  
  return (
    <div>
      <p>Elige {datos?.choose} de entre estas categorias:</p>
      {
        datos.options.map((option, index) => {
          return (
            <div>
              <CheckBox 
                label={option.type}
                name="category"
                value={index}
                onChange={() => handleOptionChange(index)}
                checked={selectedOption === index}
              />
            </div>
          )
        })
      }

      <RadioGroup
        datos={datos.options[selectedOption]}
        nombreCompetencia={nombreCompetencia}
        disableds={disableds} />
    </div>
  )
}