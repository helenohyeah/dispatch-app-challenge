import Jumbotron from "react-bootstrap/Jumbotron";
import Start from "./Start";
import AddTask from "./AddTask";
import Load from "../Load";
import useVisualMode from "../../hooks/useVisualMode";

// Visual modes
const START = "START";
const ADD_TASK = "ADD_TASK";
const ADDING = "ADDING";
const HAVE_ROUTE = "HAVE_ROUTE";

export default function Create(props) {
  
  const { mode, transition, back } = useVisualMode(START);

  const generateRoute = () => {
    props.onGenerateRoute();
    props.setMapMode("ROUTE")
    transition(HAVE_ROUTE);
  };

  return (
    <Jumbotron className="pb-3 pt-3">
      {mode === START && (
        <Start
          onAddTask={() => transition(ADD_TASK)}
          onGenerate={generateRoute}
          taskCount={props.taskCount}
        />
      )}
      {mode === ADD_TASK && (
        <AddTask
          onAdd={() => transition(ADDING)}
          onDone={() => transition(START)}
          onSubmit={props.onSubmit}
          onBack={back}
          onCheckDupes={props.onCheckDupes}
        />
      )}
      {mode === HAVE_ROUTE && <h2>Your route is generated.</h2>}
      {mode === ADDING && <Load>Adding task...</Load>}
    </Jumbotron>
  );
}
