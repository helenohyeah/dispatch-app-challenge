import Empty from './Empty';
import Form from './Form';
import Show from './Show';

import useVisualMode from '../../hooks/useVisualMode';
// import useTasks from '../../hooks/useTasks';
import { isDuplicateTask } from '../../helpers';

// Visual modes
const EMPTY = 'EMPTY';
const CREATE = 'CREATE';
const SHOW = 'SHOW';
const EDIT = 'EDIT';
const SAVING = 'SAVING';

export default function Task(props) {

  const { mode, transition } = useVisualMode(props.data ? SHOW : EMPTY);
  // const { createTask, isDuplicate } = useTasks();

  // Validate and save task
  const save = (task) => {
    if (isDuplicateTask(props.data, task)) {
      alert('Duplicate task');
    } else {
      props.onCreate(task)
        .then(() => transition(SHOW));
    }
  };

  return (
    <article>
      {mode === EMPTY && <Empty onAddNew={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          task={props.data}
          onEdit={() => transition(EDIT)}
        />
      )}
      {/* {mode === EDIT && (
        <Form
          task={props.data}
          onSave={save}
        />
      )} */}
    </article>
  );
}