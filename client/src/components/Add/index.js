import Start from "./Start";
import AddTask from "./AddTask";
import Load from "../Load";
import Jumbotron from "react-bootstrap/Jumbotron";
import useVisualMode from "../../hooks/useVisualMode";

// Visual modes
const START = "START";
const ADD_TASK = "ADD_TASK";
const ADDING = "ADDING";
const HAVE_ROUTE = "HAVE_ROUTE";

export default function Add(props) {
  
  const { mode, transition, back } = useVisualMode(START);

  /**
   * Sets page to show route components
   */
  const generateRoute = () => {
    props.onGenerateRoute();
    transition(HAVE_ROUTE);
  };

  return (
    <Jumbotron className="pb-3 pt-3">
      {mode === START && (
        <Start
          showAdd={() => transition(ADD_TASK)}
          onGenerate={generateRoute}
          taskCount={props.taskCount}
        />
      )}
      {mode === ADD_TASK && (
        <AddTask
          showAdding={() => transition(ADDING)}
          showStart={() => transition(START)}
          onSubmit={props.onSubmit}
          onBack={back}
          onCheckDupes={props.onCheckDupes}
          taskCount={props.taskCount}
        />
      )}
      {mode === HAVE_ROUTE && <h2>Your route is generated.</h2>}
      {mode === ADDING && <Load>Adding task...</Load>}
    </Jumbotron>
  );
}
