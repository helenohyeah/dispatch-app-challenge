import Empty from './Empty';
import Form from './Form';
import Show from './Show';

import useVisualMode from '../../hooks/useVisualMode';

// Visual modes
const EMPTY = 'EMPTY';
const CREATE = 'CREATE';
const SHOW = 'SHOW';
const EDIT = 'EDIT';
const SAVING = 'SAVING';

export default function Task(props) {

  const { mode, transition } = useVisualMode(props.data ? SHOW : EMPTY);
  // console.log(props.data);

  // Validate and save task
  const save = (task) => {
    if (props.onSave(task)) {
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