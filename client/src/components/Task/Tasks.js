import TaskButton from './Button';

export default function Tasks(props) {

  const tasks = props.data;
  // console.log('tasks:\n', tasks);
  const tasksList = tasks.map(task => {
    return (
    <div style={{ border: '1px solid black' }}>
      <p>{task.startLat}, {task.startLng} to {task.endLat}, {task.endLng}</p>
      <p>Freight: {task.freight}</p>
      <TaskButton>View</TaskButton>
      <TaskButton>Edit</TaskButton>
      <TaskButton>Delete</TaskButton>
    </div>
    );
  });
  // console.log('tasksList:\n', tasksList);

  return (
    <>
      <h2>Tasks</h2>
      {tasksList}
    </>
  )
}