import Form from './components/Form';
import Map from './components/Map';
import Tasks from './components/Tasks';

import useTasks from './hooks/useTasks';

import './App.css';

function App() {

  const { tasks, createTask } = useTasks();

  return (
    <>
      <h1>Hello Dispatcher</h1>
      <Form
        handleSubmit={createTask}
      />
      {/* <Map /> */}
      <Tasks
        data={tasks}
      />
    </>
  );
}

export default App;
