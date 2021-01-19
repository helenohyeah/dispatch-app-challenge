// import Form from './Task/Form';
import Map from './Map';
import Task from './Task';

import useTasks from '../hooks/useTasks';

import './App.css';

function App() {

  const { tasks, createTask } = useTasks();

  const tasksList = tasks.map(task => {
    return (
      <Task
        data={task}
        onCreate={createTask}
      />
    );
  });


  return (
    <>
      <h1>Hello Dispatcher</h1>
      {tasksList}
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
