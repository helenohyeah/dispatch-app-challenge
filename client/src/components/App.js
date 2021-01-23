import { useState } from "react";
import Add from "./Add";
import Task from "./Task";
import Map from "./Map";
import useTasks from "../hooks/useTasks";
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
      onSave={isDuplicateTask}
      onEdit={updateTask}
      onDelete={deleteTask}
      canEdit={showRoute === false}
    />
  ));
  console.log("tasksList:", tasksList);

  return (
    <>
      <h1>Hello Dispatcher</h1>
      <Add
        taskCount={tasks.length}
        onSave={isDuplicateTask}
        onAdd={addTask}
        onGenerateRoute={setShowRoute}
        setMapMode={setMapMode}
      />
      {tasksList}
      <Map
        data={tasks}
        showRoute={showRoute}
        mapMode={mapMode}
        setMapMode={setMapMode}
      />
    </>
  );
}
