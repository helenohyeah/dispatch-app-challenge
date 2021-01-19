// import Form from './Task/Form';
import Map from './Map';
import Task from './Task';

import useTasks from '../hooks/useTasks';

import './App.css';

function App() {

  const { tasks, createTask, isDuplicate } = useTasks();

  return (
    <>
      <h1>Hello Dispatcher</h1>
      <Task />
      {/* <Form
        handleNewTask={createTask}
        handleValidation={isDuplicate}
      /> */}
      {/* <Tasks
        data={tasks}
      /> */}
      {/* <Map /> */}
    </>
  );
}

export default App;
