import Edit from "./Edit";
import Show from "./Show";
import Load from "../Load";
import Card from "react-bootstrap/Card";
import useVisualMode from "../../hooks/useVisualMode";

// Visual modes
const SHOW = "SHOW";
const EDIT = "EDIT";
const SAVING = "SAVING";

export default function Task(props) {

  const { mode, transition, back } = useVisualMode(SHOW);
  
  // Style task card with task color
  const cardStyle = { border: `2px solid ${props.data.color}` };

  return (
    <Card className="mb-2" style={cardStyle}>
      {mode === SHOW && (
        <Show
          task={props.data}
          onEdit={() => transition(EDIT)}
          onDelete={props.onDelete}
          canEdit={props.canEdit}
        />
      )}
      {mode === EDIT && (
        <Edit 
          task={props.data}
          onEdit={() => transition(SAVING)}
          onDone={() => transition(SHOW)}
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
    </Card>
  );
}
