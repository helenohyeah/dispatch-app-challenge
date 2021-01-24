import TaskForm from "../TaskForm";
import { getColor } from "../../helpers/colorHelpers";

export default function AddTask(props) {

  /**
   * Handle add task transitions
   */
  const handleAddTask = (task) => {
    // Transition to loading spinner
    props.onAdd();
    // Assign task color
    task.color = getColor();
    // Submit form and transition
    props.onSubmit(task).then(() => props.onDone());
  };
  
  return (
    <>
      <h2>Add Task</h2>
      <TaskForm
        onSubmit={handleAddTask}
        onBack={props.onBack} 
        onCheckDupes={props.onCheckDupes}
      />
    </>
  );
}
