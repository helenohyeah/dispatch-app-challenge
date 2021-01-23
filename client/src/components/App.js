import Add from "./Add";
import Task from "./Task";
import Map from "./Map";

import useTasks from "../hooks/useTasks";
import useVisualMode from "../hooks/useVisualMode";

import "./App.css";

export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    isDuplicateTask,
  } = useTasks();
  const { mapMode, setMapMode } = useVisualMode(null, "EMPTY");

  // console.log('App tasks:', tasks);
  const tasksList = tasks.map((task) => (
    <Task
      key={task.id}
      data={task}
      onSave={isDuplicateTask}
      onEdit={updateTask}
      onDelete={deleteTask}
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
      />
      {tasksList}
      Debug Buttons
      <button onClick={() => setMapMode("VIEW_TASK")}>TaskMap</button>
      <button onClick={() => setMapMode("VIEW_ROUTE")}>RouteMap</button>
      <br />
      <Map
        data={tasks}
        onTransition={setMapMode}
        mode={mapMode}
      />
    </>
  );
}
