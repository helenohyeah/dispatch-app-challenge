import { useReducer, useEffect } from 'react';
import axios from 'axios';
import isEqual from 'lodash.isequal';
import omit from 'lodash.omit';

// Action types
const GET_TASKS = 'GET_TASKS';
const CREATE_TASK = 'CREATE_TASK';

// Manage state transitions for tasks
const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return [ ...action.tasks ];
    case CREATE_TASK:
      return [ ...state, action.newTask ];
    default:
      return state;
  }
}

export default function useTasks() {

  const initialTasks = [];
  const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks);

  // Server url
  axios.defaults.baseURL = 'http://localhost:8080';

  // Get tasks from server and set state on load
  useEffect(() => {
    axios.get('/api/tasks')
      .then(res => {
        const tasks = res.data;
        dispatchTasks({ type: GET_TASKS, tasks });
      })
      .catch(err => console.log('Error getting tasks data:', err));
  }, []);

  // Create a new task and add to state
  function createTask(task) {
    // console.log('create this:', task);
    axios.post('/api/tasks', task)
      .then((res) => {
        const newTask = res.data;
        dispatchTasks({ type: CREATE_TASK, newTask })
      });
  };

  // Check to prevent dispatcher from creating identical movement task
  function isDuplicate(taskToCheck) {
    return tasks.some(task => isEqual(omit(task, ['id']), taskToCheck));
  };

  return {
    tasks,
    createTask,
    isDuplicate
  };
}