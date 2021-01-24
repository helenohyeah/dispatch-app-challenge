import { useState, useEffect } from "react";
import NavTop from "./NavTop";
import NavBot from "./NavBot";
import Add from "./Add";
import Task from "./Task";
import Map from "./Map";
import Load from "./Load";
import Error from "./Error";
import useTasks from "../hooks/useTasks";
import useVisualMode from "../hooks/useVisualMode";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./App.css";

// Map modes
const TASKS = "TASKS";
const ROUTE = "ROUTE";

// Page visual modes
const LOADING = "LOADING";
const SHOW = "SHOW";
const ERROR = "ERROR";

export default function App() {

  // Tracks whether a route is generated and can be shown
  const [ showRoute, setShowRoute ] = useState(false);
  // Map modes
  const [ mapMode, setMapMode ] = useState(TASKS);

  // Page visual modes
  const { mode, transition } = useVisualMode(LOADING);
  // Task handlers
  const {
    tasks,
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    isDuplicateTask
  } = useTasks();

  // Get tasks data on load and transition page
  useEffect(() => {
    getTasks()
      .then(() => transition(SHOW))
      .catch((err) => {
        transition(ERROR);
        console.error("Error getting tasks data:", err.message);
      });
  }, []);

  // Generate task list
  const tasksList = tasks.map(task => (
    <Task
      key={task.id}
      data={task}
      onCheckDupes={isDuplicateTask}
      onSubmit={updateTask}
      onDelete={deleteTask}
      canEdit={showRoute === false}
    />
  ));
  
  /**
   * Set page to show route map and prevent task changes
   */
  const showRouteMap = () => {
    setShowRoute(true);
    setMapMode(ROUTE);
  };

  return (
    <>
      <NavTop />
      <Container fluid>
      {mode === LOADING && (
        <Jumbotron>
          <Load>Loading...</Load>
        </Jumbotron>
      )}
      {mode === ERROR && (
        <Jumbotron>
          <Error>😥 Something went wrong</Error>
        </Jumbotron>
      )}
      {mode === SHOW && (
        <>
          <Add
            taskCount={tasks.length}
            onSave={isDuplicateTask}
            onSubmit={addTask}
            onGenerateRoute={showRouteMap}
            onCheckDupes={isDuplicateTask}
          />
          {tasksList}
          <Map
            data={tasks}
            isRouteDisabled={showRoute === false}
            mapMode={mapMode}
            setMapMode={setMapMode}
          />
        </>
      )}
      </Container>
      <NavBot />
    </>
  );
}
