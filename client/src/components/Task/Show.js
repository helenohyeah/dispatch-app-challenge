import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Show(props) {

  const task = props.task;

  return (
    <Card className="mb-2" style={{ border: `2px solid #${task.color}`}}>
      <Card.Header>
        <Row>
          <Col>
            Task No. {task.id}
          </Col>
          {props.canEdit && (
            <Col xs="auto">
              <Button variant="primary" size="sm" onClick={props.onEdit}>Edit</Button>{' '}
              <Button variant="danger" size="sm" onClick={() => props.onDelete(task.id)}>Delete</Button>
            </Col>
          )}
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <span className="bold">Start Location:</span> {task.start.City} ({task.start.lat}, {task.end.lng})<br />
          <span className="bold">End Location:</span> {task.end.City} ({task.end.lat}, {task.end.lng})<br />
          <span className="bold">Freight:</span> {task.freight}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
