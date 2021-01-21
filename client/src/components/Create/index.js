import Add from './Add';
import AddTask from './AddTask';

import useVisualMode from '../../hooks/useVisualMode';
import { getColor } from '../../helpers/colorHelpers';

// Visual modes
const START = 'START';
const ADD_TASK = 'ADD_TASK';
const ADDING = 'ADDING';

export default function Create(props) {

  const { mode, transition } = useVisualMode(START);

  // Validate and save task
  const save = (task) => {
    if (props.onSave(task)) {
      alert('Duplicate task');
    } else {
      transition(ADDING);
      // Add a hex color to task to differentiate tasks
      task.color = getColor();
      props.onAdd(task)
        .then(() => transition(START));
    }
  };

  return (
    <>
      {mode === START && (
        <Add 
          onAddTask={() => transition(ADD_TASK)}
        />
      )}
      {mode === ADD_TASK && (
        <AddTask
          onSave={save}
        />
      )}
      {mode === ADDING && <p>Adding Task...</p>}
    </>
  );
}