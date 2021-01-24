import { useState } from "react";
import Nav from "./Nav";
import Add from "./Add";
import Task from "./Task";
import Map from "./Map";
import useTasks from "../hooks/useTasks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  } = useTasks();

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
      <Nav />
      <Container fluid>
        <Row>
          <Col>
            <Add
              taskCount={tasks.length}
              onSave={isDuplicateTask}
              onSubmit={addTask}
              onGenerateRoute={() => setShowRoute(true)}
              setMapMode={setMapMode}
              onCheckDupes={isDuplicateTask}
            />
          </Col>
        </Row>
        {tasksList}
        <Map
          data={tasks}
          isRouteDisabled={showRoute === false}
          mapMode={mapMode}
          setMapMode={setMapMode}
        />
      </Container>
    </>
  );
}
