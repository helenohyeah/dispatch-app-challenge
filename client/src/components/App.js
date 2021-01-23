import Task from "./Task";
import Create from "./Create";
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
  const { mapMode, setMapMode } = useVisualMode(null, "TASK");

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
      <Create onSave={isDuplicateTask} onAdd={addTask} />
      {tasksList}
      <Map
        data={tasks}
        onTransition={setMapMode}
        mode={mapMode}
      />
    </>
  );
}
