import Select from "react-select"
import { Label } from "reactstrap"
import { caracteristicas } from "../../../data/data"

export default function MultiSelect({ index, label, options, selectedOptions, setOptions, max, disabled, competencias }) {

  const handleChange = (selected) => {
    if (selected.length <= max) {
      const auxOptions = [...selectedOptions]
      auxOptions[index] = selected
      setOptions(auxOptions)
    }
  }

  const arrayNombre = label?.split('_') ?? []

  return (
    <div>
      <br/>
      <Label> Elige {competencias ? 'competencia en ' : ''} {max} {arrayNombre[1] ? arrayNombre[0] + '/s (' + caracteristicas[arrayNombre[1]] + ')' : label + '/s'} de entre estas opciones: </Label>
      <Select
        isMulti
        name={label}
        options={
          options.map(option => {
            return {
              value: option.index,
              label: option.name,
              isDisabled: (selectedOptions ? selectedOptions[index]?.length >= max : false) || (disabled.map(dis => dis.index).includes(option.index))
            }
          })
        }
        className="basic-multi-select"
        classNamePrefix="select"
        value={selectedOptions ? selectedOptions[index] : []}
        onChange={handleChange}
      />
    </div>
  )
}