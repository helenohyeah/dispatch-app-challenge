import Form from './Form';
import Map from './Map';
import Tasks from './Tasks';

import useTasks from '../hooks/useTasks';

import './App.css';

function App() {

  const { tasks, createTask, isDuplicate } = useTasks();

  return (
    <>
      <h1>Hello Dispatcher</h1>
      <Form
        handleNewTask={createTask}
        handleValidation={isDuplicate}
      />
      <Tasks
        data={tasks}
      />
      <Map />
    </>
  );
}

export default App;
