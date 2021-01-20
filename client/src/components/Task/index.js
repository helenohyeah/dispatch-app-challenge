import Form from './Form';
import Show from './Show';
import Load from './Load';

import useVisualMode from '../../hooks/useVisualMode';

// Visual modes
const SHOW = 'SHOW';
const EDIT = 'EDIT';
const SAVING = 'SAVING';

export default function Task(props) {

  const { mode, transition } = useVisualMode(SHOW);

  // Delete task
  // ****add confirmation later?
  const deleteTask = (id) => {
    props.onDelete(id);
  };

  return (
    <article>
      {mode === SHOW && (
        <Show
          task={props.data}
          onEdit={() => transition(EDIT)}
          onDelete={deleteTask}
        />
      )}
      {/* {mode === EDIT && (
        <Form
          task={props.data}
          onSave={save}
        />
      )}
      {mode === SAVING && <Load>Saving changes...</Load>} */}
    </article>
  );
}