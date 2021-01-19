import Empty from './Empty';
import Form from './Form';

import useVisualMode from '../../hooks/useVisualMode';
import useTasks from '../../hooks/useTasks';

// Visual modes
const EMPTY = 'EMPTY';
const CREATE = 'CREATE';
const EDIT = 'EDIT';
const SAVING = 'SAVING';

export default function Task(props) {

  const { mode, transition } = useVisualMode(EMPTY);
  const { createTask, isDuplicate } = useTasks();

  // Validate and save task
  const save = (task) => {
    if (isDuplicate(task)) {
      alert('Duplicate task');
    } else {
      createTask(task);
    }
  };

  return (
    <article style={{ border: '1px solid black' }}>
      {mode === EMPTY && <Empty onCreate={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onSave={save}
        />
      )}
    </article>
  );
}