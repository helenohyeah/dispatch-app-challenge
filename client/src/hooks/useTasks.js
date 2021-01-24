import { useReducer } from "react";
import axios from "axios";
import isEqual from "lodash.isequal";
import omit from "lodash.omit";

// Action types
const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";

/**
 * Manage state transitions for tasks
 */
const tasksReducer = (state, action) => {
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
};

export default function useTasks() {

  const [ tasks, dispatchTasks ] = useReducer(tasksReducer, []);

  // Server url
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:8080";

 
  /**
   * Get tasks from server and add to state
   */
  const getTasks = () => {
    return axios.get("/api/tasks")
      .then(res => {
        const tasksData = res.data;
        dispatchTasks({ type: GET_TASKS, tasksData });
      });
  };

  /**
   * Create a new task and add to state
   */
  const addTask = (task) => {
    return axios.post("/api/tasks", task)
      .then(res => {
        const newTask = res.data;
        dispatchTasks({ type: ADD_TASK, newTask });
      });
  };

  /** 
   * Edit an existing task and update state
   */
  const updateTask = (task) => {
    return axios.put(`/api/tasks/${task.id}`, task)
      .then(res => {
        const updatedTask = res.data;
        dispatchTasks({ type: UPDATE_TASK, updatedTask });
      });
  };

  /**
   * Delete a task and update state
   */
  const deleteTask = (id) => {
    return axios.delete(`/api/tasks/${id}`)
      .then(() => dispatchTasks({ type: DELETE_TASK, id }));
  };

  /**
   * Returns true if given task already exists
   */
  const isDuplicateTask = (taskToCheck) => {
    return tasks.some(task => isEqual(omit(task, ["id", "color"]), omit(taskToCheck, ["id", "color"])));
  };

  return {
    tasks,
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    isDuplicateTask
  };
}