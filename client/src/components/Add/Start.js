import Button from "react-bootstrap/Button";

export default function Start(props) {

  // Track maximum tasks and set add message
  const maxTasks = 10;
  const taskCount = props.taskCount;

  let message;
  let isAddTaskDisabled = false;
  let isGenerateRouteDisabled = false;
  if (taskCount === 0 || taskCount === 1) {
    message = 'Add at least 2 tasks to generate a route.';
    isGenerateRouteDisabled = true;
  } else if (taskCount === maxTasks) {
    message = 'You added the maximum number of tasks. Generate a route!';
    isAddTaskDisabled = true;
  } else {
    message = 'Add more tasks or generate a route.'
  }

  return (
    <>
      <h2>{message}</h2>
      <p>You have {taskCount} {taskCount === 1 ? 'task' : 'tasks'} (max {maxTasks}).</p>
      <Button variant="primary" disabled={isAddTaskDisabled} onClick={props.showAdd}>Add Task</Button>{' '}
      <Button variant="success" disabled={isGenerateRouteDisabled} onClick={props.onGenerate}>Generate Route</Button>
    </>
  );
}
