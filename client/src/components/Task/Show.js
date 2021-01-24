import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Show(props) {

  const task = props.task;

  return (
    <>
      <Card.Header>
        <h4>Task No. {task.id}</h4>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <span className="bold">Start Location:</span> {task.start.city} ({task.start.lat}, {task.end.lng})<br />
          <span className="bold">End Location:</span> {task.end.city} ({task.end.lat}, {task.end.lng})<br />
          <span className="bold">Freight:</span> {task.freight}
        </Card.Text>
          {props.canEdit && (
            <>
              <Button variant="primary" onClick={props.onEdit}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => props.onDelete(task.id)}>Delete</Button>
            </>
          )}
      </Card.Body>
    </>
  );
}
