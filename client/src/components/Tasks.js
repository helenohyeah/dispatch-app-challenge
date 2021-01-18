import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tasks() {

  const [tasks, setTasks] = useState([]);

  axios.defaults.baseURL = 'http://localhost:8080';
  useEffect(() => {
    axios.get('/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);
  
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