import Start from "./Start";
import AddTask from "./AddTask";

import useVisualMode from "../../hooks/useVisualMode";
import { getColor } from "../../helpers/colorHelpers";

// Visual modes
const START = "START";
const ADD_TASK = "ADD_TASK";
const ADDING = "ADDING";
const HAVE_ROUTE = "HAVE_ROUTE";

export default function Create(props) {
  
  const { mode, transition } = useVisualMode(START);

  // Validate and save task
  const save = (task) => {
    if (props.onSave(task)) {
      // Duplicate task show alert
      alert("Duplicate task");
    } else {
      // Save task and transition
      transition(ADDING);
      // Assign color to task
      task.color = getColor();
      props.onAdd(task).then(() => transition(START));
    }
  };

  const generateRoute = () => {
    props.onGenerateRoute(true);
    props.setMapMode("VIEW_ROUTE")
    transition(HAVE_ROUTE);
  };

  return (
    <>
      {mode === START && (
        <Start
          onAddTask={() => transition(ADD_TASK)}
          onGenerate={generateRoute}
          taskCount={props.taskCount}
        />)
      }
      {mode === ADD_TASK && <AddTask onSave={save} />}
      {mode === HAVE_ROUTE && <p>Route generated</p>}
      {mode === ADDING && <p>Adding Task...</p>}
    </>
  );
}
