import Card from "react-bootstrap/Card";
import TaskForm from "../TaskForm";

export default function Edit(props) {

  /**
   * Handle edit task transitions
   */
  const handleEditTask = (task) => {
    // Transition to loading spinner
    props.onEdit();
    // Submit form and transition
    props.onSubmit(task).then(() => props.onDone());
  };

  return (
    <>
      <Card.Header>
        Edit Task
      </Card.Header>
      <Card.Body>
        <TaskForm
          task={props.task}
          onSubmit={handleEditTask}
          onBack={props.onBack}
          onCheckDupes={props.onCheckDupes}
        />
      </Card.Body>
    </>
  );
}
