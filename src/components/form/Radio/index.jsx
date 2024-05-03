import { FormGroup, Input, Label } from "reactstrap";

export default function Radio({ label, checked, disabled, onChange }) {
  
  return (
    <FormGroup check>
      <Input type="radio" checked={checked} disabled={disabled} onChange={onChange} />
      <Label check>
        {label}
      </Label>
    </FormGroup>
  )
}