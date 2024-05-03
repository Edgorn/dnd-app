import { FormGroup, Input, Label } from "reactstrap";

export default function CheckBox({ label, checked, disabled, onChange, name }) {
  
  return (
    <FormGroup check>
      <Input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} name={name} />
      <Label check>
        {label}
      </Label>
    </FormGroup>
  )
}