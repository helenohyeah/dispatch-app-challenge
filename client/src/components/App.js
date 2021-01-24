import { useState } from "react";
import TopNav from "./TopNav";
import Add from "./Add";
import Task from "./Task";
import Map from "./Map";
import Load from "./Load";
import BotNav from "./BotNav";
import useTasks from "../hooks/useTasks";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./App.css";

// Map modes
const TASKS = "TASKS";
const ROUTE = "ROUTE";

export default function App() {

  const [ showRoute, setShowRoute ] = useState(false);
  const [ mapMode, setMapMode ] = useState(TASKS);

  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    isDuplicateTask,
    areTasksLoaded
  } = useTasks();

  console.log(areTasksLoaded);
  // console.log('App tasks:', tasks);
  const tasksList = tasks.map((task) => (
    <Task
      key={task.id}
      data={task}
      onCheckDupes={isDuplicateTask}
      onSubmit={updateTask}
      onDelete={deleteTask}
      canEdit={showRoute === false}
    />
  ));
  // console.log("tasksList:", tasksList);

  return (
    <>
      <TopNav />
      <Container fluid>
      {!areTasksLoaded && (
        <Jumbotron>
          <Load>Loading...</Load>
        </Jumbotron>
      )}
      {areTasksLoaded && (
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
      <BotNav />
    </>
  );
}
