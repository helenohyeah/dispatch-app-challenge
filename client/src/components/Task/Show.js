import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Show(props) {

  const task = props.task;

  return (
    <>
      <Card.Header>
        <Row>
          <Col>
            <h4>Task No. {task.id}</h4>
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
          <span className="bold">Start Location:</span> {task.start.city} ({task.start.lat}, {task.end.lng})<br />
          <span className="bold">End Location:</span> {task.end.city} ({task.end.lat}, {task.end.lng})<br />
          <span className="bold">Freight:</span> {task.freight}
        </Card.Text>
      </Card.Body>
    </>
  );
}
