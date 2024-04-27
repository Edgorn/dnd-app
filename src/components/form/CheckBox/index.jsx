import { FormGroup, Input, Label } from "reactstrap";

export default function CheckBox({ label, checked, disabled }) {
  
  return (
    <FormGroup check>
      <Input type="radio" checked={checked} disabled={disabled} />
      <Label check>
        {label}
      </Label>
    </FormGroup>
  )
}