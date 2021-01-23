import { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function TaskForm(props) {

  const [ dupe, setDupe ] = useState(false);

  /**
   * Handle task form validation and submission
   */
  const handleSubmit = (e) => {
    const form = e.currentTarget;

    // Check validity of form fields
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const task = {
      start: {
        city: form.startCity.value,
        lat: Number(form.startLocation[0].value),
        lng: Number(form.startLocation[1].value)
      },
      end: {
        city: form.endCity.value,
        lat: Number(form.endLocation[0].value),
        lng: Number(form.endLocation[1].value)
      },
      freight: form.freight.value
    }

    if (props.onCheckDupes(task)) {
      // Show alert if task is a duplicate
      e.preventDefault();
      e.stopPropagation();
      setDupe(true);
    } else {
      // Submit form with task data
      props.onSubmit(task);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Start Location</h4>
      <Form.Group as={Row} controlId="startCity">
        <Form.Label column sm={2}>City:</Form.Label>
        <Col>
          <Form.Control required type="text" placeholder="e.g. Toronto" />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} controlId="startLocation">
        <Form.Label column sm={2}>Location:</Form.Label>
          <Col>
            <Form.Control required type="number" placeholder="Latitude" step="any"></Form.Control>
          </Col>
          <Col>
            <Form.Control required type="number" placeholder="Longitude" step="any"></Form.Control>
          </Col>
      </Form.Group>

      <h4>End Location</h4>
      <Form.Group as={Row} controlId="endCity">
        <Form.Label column sm={2}>City:</Form.Label>
        <Col>
          <Form.Control required type="text" placeholder="e.g. Ottawa" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="endLocation">
        <Form.Label column sm={2}>Location:</Form.Label>
          <Col>
            <Form.Control required type="number" placeholder="Latitude" step="any"></Form.Control>
          </Col>
          <Col>
            <Form.Control required type="number" placeholder="Longitude" step="any"></Form.Control>
          </Col>
      </Form.Group>

      <Form.Group controlId="freight">
        <Form.Label>Freight Description:</Form.Label>
        <Form.Control required type="text" />
      </Form.Group>

      {dupe === true && <Alert variant="danger">This task is identical to an existing task. Please change it and try again.</Alert>}

      <Button variant="success" type="submit">Create</Button>{' '}
      <Button variant="secondary" onClick={props.onBack}>Back</Button>
    </Form>
  );
}