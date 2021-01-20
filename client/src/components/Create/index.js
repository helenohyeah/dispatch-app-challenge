import Add from './Add';
import AddTask from './AddTask';

import useVisualMode from '../../hooks/useVisualMode';

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