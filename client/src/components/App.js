import Task from './Task';

import useTasks from '../hooks/useTasks';

import './App.css';

function App() {

  const { tasks, createTask, isDuplicateTask } = useTasks();
  
  const tasksList = tasks.map(task => {
    return (
      <Task
      data={task}
      onCreate={createTask}
      onSave={isDuplicateTask}
      />
      );
    });
    
  // Add an empty task component if below max tasks
  const maxTasks = 5;
  if (tasks.length < maxTasks) {
    tasksList.push(
      <Task
        onCreate={createTask}
        onSave={isDuplicateTask}
      />
    );
  }

  // console.log(tasksList);

  return (
    <>
      <h1>Hello Dispatcher</h1>
      {tasksList}
    </>
  );
}

export default App;
