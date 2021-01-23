import Start from "./Start";
import AddTask from "./AddTask";
import useVisualMode from "../../hooks/useVisualMode";

import Jumbotron from "react-bootstrap/Jumbotron";

// Visual modes
const START = "START";
const ADD_TASK = "ADD_TASK";
const ADDING = "ADDING";
const HAVE_ROUTE = "HAVE_ROUTE";

export default function Create(props) {
  
  const { mode, transition, back } = useVisualMode(START);

  const generateRoute = () => {
    props.onGenerateRoute(true);
    props.setMapMode("VIEW_ROUTE")
    transition(HAVE_ROUTE);
  };

  return (
    <Jumbotron>
      {mode === START && (
        <Start
          onAddTask={() => transition(ADD_TASK)}
          onGenerate={generateRoute}
          taskCount={props.taskCount}
        />)
      }
      {mode === ADD_TASK && (
        <AddTask
          onAdd={() => transition(ADDING)}
          onDone={() => transition(START)}
          onSubmit={props.onSubmit}
          onBack={back}
          onCheckDupes={props.onCheckDupes}
        />
      )}
      {mode === HAVE_ROUTE && <p>Route generated</p>}
      {mode === ADDING && <p>Adding Task...</p>}
    </Jumbotron>
  );
}
