import { useReducer, useEffect } from 'react';
import axios from 'axios';

// Action types
const GET_TASKS = 'GET_TASKS';

// Manage state transitions for tasks
const taskReducer = (state, action) => {
  
  switch (action.type) {
    case GET_TASKS:
      return [ ...action.tasks ]
    default:
      return state;
  }
}

export default function useTasks() {

  const initialTasks = [];
  const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks);

  // Get tasks from server and set state on load
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.get('/api/tasks')
      .then(res => {
        const tasks = res.data;
        dispatchTasks({ type: GET_TASKS, tasks });
      })
      .catch(err => console.log('Error getting tasks data:', err));
  }, []);

  return {
    tasks
  };
}