import isEqual from "lodash.isequal";

import Edit from "./Edit";
import Show from "./Show";

import useVisualMode from "../../hooks/useVisualMode";

// Visual modes
const SHOW = "SHOW";
const EDIT = "EDIT";
const SAVING = "SAVING";

export default function Task(props) {
  const { mode, transition } = useVisualMode(SHOW);

  // Validate and save edits
  const save = (task) => {
    // console.log('save edits:', task);
    // console.log(props.onSave(task));

    if (isEqual(props.data, task)) {
      // No changes transition back
      transition(SHOW);
    } else if (props.onSave(task)) {
      // Duplicate task show alert
      alert("Duplicate task");
    } else {
      // Save task and transition
      // console.log('saving edits');
      transition(SAVING);
      props.onEdit(task).then(() => transition(SHOW));
    }
  };

  // Delete task
  // DENYS: remove if you don't do more with this later
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
          canEdit={props.canEdit}
        />
      )}
      {mode === EDIT && <Edit task={props.data} onSave={save} />}
      {mode === SAVING && <p>Saving changes...</p>}
    </article>
  );
}
