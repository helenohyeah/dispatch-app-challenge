import { useState } from "react";
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
  const [ mapMode, setMapMode ] = useState(TASKS);

  // Handle page visual modes
  const { mode, transition } = useVisualMode(LOADING);
  const showPage = () => transition(SHOW);
  const showError = () => transition(ERROR);

  // Task handlers
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    isDuplicateTask
  } = useTasks({ showPage, showError });

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

  return (
    <>
      <NavTop id="nav-top" />
      <Container id="main" fluid>
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
            onGenerateRoute={() => setShowRoute(true)}
            setMapMode={setMapMode}
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
      <NavBot id="nav-bot" />
    </>
  );
}
