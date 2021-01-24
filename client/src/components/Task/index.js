import Edit from "./Edit";
import Show from "./Show";
import Load from "../Load";
import Error from "../Error";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useVisualMode from "../../hooks/useVisualMode";

// Visual modes
const SHOW = "SHOW";
const EDIT = "EDIT";
const SAVING = "SAVING";
const ERROR = "ERROR";
const DELETING = "DELETING";

export default function Task(props) {

  const { mode, transition, back } = useVisualMode(SHOW);
  
  // Style task card with task color
  const cardStyle = { border: `2px solid ${props.data.color}` };

  /**
   * Handles delete task and transitions
   */
  const deleteTask = (id) => {
    transition(DELETING);
    props.onDelete(id)
      .catch(err => {
        transition(ERROR, true);
        console.error("Error deleting task:", err.message);
      });
  }

  return (
    <Card className="mb-2" style={cardStyle}>
      {mode === SHOW && (
        <Show
          task={props.data}
          onEdit={() => transition(EDIT)}
          onDelete={deleteTask}
          canEdit={props.canEdit}
        />
      )}
      {mode === EDIT && (
        <Edit 
          task={props.data}
          onEdit={() => transition(SAVING)}
          onDone={() => transition(SHOW)}
          onError={() => transition(ERROR, true)}
          onBack={back}
          onSubmit={props.onSubmit}
          onCheckDupes={props.onCheckDupes}
        />
      )}
      {mode === SAVING && (
        <Card.Body>
          <Load>Saving changes...</Load>
        </Card.Body>
      )}
      {mode === DELETING && (
        <Card.Body>
          <Load>Deleting...</Load>
        </Card.Body>
      )}
      {mode === ERROR && (
        <Card.Body>
          <Error>😥 Something went wrong</Error>
          <Button onClick={back}>Back</Button>
        </Card.Body>
      )}
    </Card>
  );
}
