export default function Start(props) {

  // Track maximum tasks and set add message
  const maxTasks = 10;
  const taskCount = props.taskCount;

  let message;
  let isAddTaskDisabled = false;
  let isGenRouteDisabled = false;
  if (taskCount === 0 || taskCount === 1) {
    message = 'Add at least 2 tasks to generate a route.';
    isGenRouteDisabled = true;
  } else if (taskCount === maxTasks) {
    message = 'You added the maximum number of tasks. Generate a route!';
    isAddTaskDisabled = true;
  } else {
    message = 'Add a task or generate a route.'
  }

  return (
    <>
      <h3>{`${taskCount}/${maxTasks} Tasks. ${message}`}</h3>
      <button disabled={isAddTaskDisabled} onClick={props.onAddTask}>Add Task</button>
      <button disabled={isGenRouteDisabled} onClick={props.onGenerate}>Generate Route</button>
    </>
  );
}
