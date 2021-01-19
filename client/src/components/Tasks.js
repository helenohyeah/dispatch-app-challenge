// import useTasks from '../hooks/useTasks';

export default function Tasks(props) {

  // const { tasks } = useTasks();
  // console.log(tasks);
  const tasks = props.data;
  const tasksList = tasks.map(task => <li key={task.id}>{task.start} to {task.end} - Freight: {task.freight}</li>);

  return (
    <>
      <h2>Tasks</h2>
      <ul>
        {tasksList}
      </ul>
    </>
  )
}