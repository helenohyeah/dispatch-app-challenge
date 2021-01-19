import useTasks from '../hooks/useTasks';

export default function Tasks() {

  const { tasks } = useTasks();
  // console.log(tasks);
  
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