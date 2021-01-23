import Start from "./Start";
import AddTask from "./AddTask";
import AddRoute from "./AddRoute";

import useVisualMode from "../../hooks/useVisualMode";
import { getColor } from "../../helpers/colorHelpers";

// Visual modes
const START = "START";
const ADD_TASK = "ADD_TASK";
const ADDING = "ADDING";
const GENERATE_ROUTE = "GENERATE_ROUTE";
const GENERATING = "GENERATING";

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

  const generateRoute = (tasks) => {
    transition(GENERATING);
    // generate route on map
    // transition to ViewRoute
    // transition tasks to ??
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
      {mode === GENERATE_ROUTE && <AddRoute />}
      {mode === ADDING && <p>Adding Task...</p>}
      {mode === GENERATING && <p>Generating Route...</p>}
    </>
  );
}
