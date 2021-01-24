import TaskForm from "../TaskForm";
import { getRandColor } from "../../helpers/colorHelpers";

export default function AddTask(props) {

  /**
   * Handle add task transitions
   */
  const handleAddTask = (task) => {
    // Transition to loading spinner
    props.showAdding();
    // Assign task color
    task.color = getRandColor(props.taskCount + 1);
    // Submit form and transition
    props.onSubmit(task)
      .then(() => props.showStart())
      .catch(err => {
        props.showError();
        console.log("Error adding task:", err);
      });
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
