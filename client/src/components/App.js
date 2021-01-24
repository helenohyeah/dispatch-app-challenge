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

export default function App() {

  const [ showRoute, setShowRoute ] = useState(false);

// Map modes
const VIEW_TASK = "VIEW_TASK";
const VIEW_ROUTE = "VIEW_ROUTE";

const [ mapMode, setMapMode ] = useState("VIEW_TASK");


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
  console.log("tasksList:", tasksList);

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
              onGenerateRoute={setShowRoute}
              setMapMode={setMapMode}
              onCheckDupes={isDuplicateTask}
            />
          </Col>
        </Row>
        {tasksList}
        <Map
          data={tasks}
          showRoute={showRoute}
          mapMode={mapMode}
          setMapMode={setMapMode}
        />
      </Container>
    </>
  );
}
