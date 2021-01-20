import { useReducer, useEffect } from 'react';
import axios from 'axios';
import isEqual from 'lodash.isequal';
import omit from 'lodash.omit';

// Action types
const GET_TASKS = 'GET_TASKS';
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';

// Manage state transitions for tasks
const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return [ ...action.tasksData ];
    case ADD_TASK:
      return [ ...state, action.newTask ];
    case UPDATE_TASK:
      return state.map(task => task.id === action.updatedTask.id ? action.updatedTask : task);
    case DELETE_TASK:
      return state.filter(task => task.id !== action.id);
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
        const tasksData = res.data;
        dispatchTasks({ type: GET_TASKS, tasksData });
      })
      .catch(err => console.log('Error getting tasks data:', err));
  }, []);

  // Create a new task and add to state
  function addTask(task) {
    return axios.post('/api/tasks', task)
      .then(res => {
        const newTask = res.data;
        dispatchTasks({ type: ADD_TASK, newTask });
      });
  };

  // Edit an existing task and update state
  function updateTask(task) {
    return axios.put(`/api/tasks/${task.id}`, task)
      .then(res => {
        const updatedTask = res.data;
        dispatchTasks({ type: UPDATE_TASK, updatedTask });
      });
  }

  // Delete a task and update state
  function deleteTask(id) {
    return axios.delete(`/api/tasks/${id}`)
      .then(() => {
        dispatchTasks({ type: DELETE_TASK, id });
      });
  }

  // Check if task already exists
  function isDuplicateTask(taskToCheck) {
    return tasks.some(task => isEqual(omit(task, ['id']), omit(taskToCheck, ['id'])));
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    isDuplicateTask
  };
}