import { Button, Col, Row } from "reactstrap";
import './index.css'

export default function Ability({id, name, value, bonus, increase, decrease}) {
  const valorHabilidad = () => {
    return formatNumber(Math.floor(((value + bonus)/2) - 5))
  }

  function formatNumber(num) {
    return (num >= 0 ? "+" : "") + num.toString();
  }

  return (
    <Row className="mb-1">
      <Col className="col-4">
        {name}
      </Col>
      <Col className="col-6 pl-0 pr-0">
        <div className="input-group">
          <Button className="btn btn-sm btn-default btn-round" onClick={() => decrease(id)}>
            -
          </Button>
          
          <div className="form-control input-sm text-center spinner-display">
            {value + ' + ' + bonus}
          </div>
          
          <Button className="btn btn-sm btn-default btn-round" onClick={() => increase(id)}>
            +
          </Button>
        </div>
      </Col>
      <Col className="col-2 text-center text-bold-600">
        {valorHabilidad()}
      </Col>
    </Row>
  )
}