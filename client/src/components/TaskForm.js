import { useState } from "react";
import isEqual from "lodash.isequal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import useTaskForm from "../hooks/useTaskForm";

export default function TaskForm(props) {

  const [ dupe, setDupe ] = useState(false);
  const { task, handleChange } = useTaskForm(props.task || {
    start: { city: '', lat: '', lng: '' },
    end: { city: '', lat: '', lng: '' },
    freight: ''
  });

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

    // Transition back if no changes
    if (isEqual(props.task, task)) props.onBack();
    
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
          <Form.Control required type="text" placeholder="e.g. Toronto" onChange={e => handleChange(e)} value={task.start.city} />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Location:</Form.Label>
          <Col>
            <Form.Control 
              id="startLat" 
              required 
              type="number" 
              placeholder="Latitude" 
              step="any" 
              onChange={e => handleChange(e)} 
              value={task.start.lat}
              min={-90}
              max={90}
            />
          </Col>
          <Col>
            <Form.Control 
              id="startLng" 
              required type="number" 
              placeholder="Longitude" 
              step="any" 
              onChange={e => handleChange(e)} 
              value={task.start.lng}
              min={-180}
              max={180}
            />
          </Col>
      </Form.Group>

      <h4>End Location</h4>
      <Form.Group as={Row} controlId="endCity">
        <Form.Label column sm={2}>City:</Form.Label>
        <Col>
          <Form.Control 
            required 
            type="text" 
            placeholder="e.g. Ottawa" 
            onChange={e => handleChange(e)} 
            value={task.end.city} 
            min={-180}
            max={180}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>Location:</Form.Label>
          <Col>
            <Form.Control 
              id="endLat" 
              required 
              type="number" 
              placeholder="Latitude" 
              step="any" 
              onChange={e => handleChange(e)} 
              value={task.end.lat}
              min={-90}
              max={90}
            />
          </Col>
          <Col>
            <Form.Control id="endLng" required type="number" placeholder="Longitude" step="any" onChange={e => handleChange(e)} value={task.end.lng} />
          </Col>
      </Form.Group>

      <Form.Group controlId="freight">
        <Form.Label>Freight Description:</Form.Label>
        <Form.Control required type="text" onChange={e => handleChange(e)} value={task.freight} />
      </Form.Group>

      {dupe === true && (
        <Alert variant="danger">
          This task is identical to an existing task. Please change it and try again.
        </Alert>
      )}

      <Button variant="success" type="submit">{props.task ? 'Save' : 'Create'}</Button>{' '}
      <Button variant="secondary" onClick={props.onBack}>Back</Button>
    </Form>
  );
}