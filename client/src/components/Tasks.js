// import useTasks from '../hooks/useTasks';

export default function Tasks(props) {

  const tasks = props.data;
  console.log('tasks:\n', tasks);
  const tasksList = tasks.map(task => {
    return (<li key={task.id}>
      {task.start} to {task.end} - Freight: {task.freight}
    </li>);
  });
  console.log('tasksList:\n', tasksList);

  return (
    <>
      <h2>Tasks</h2>
      <ul>
        {tasksList}
      </ul>
    </>
  )
}