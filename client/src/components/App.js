import Task from './Task';

import useTasks from '../hooks/useTasks';

import './App.css';

function App() {

  const { tasks, createTask, updateTask, isDuplicateTask } = useTasks();
  
  const tasksList = tasks.map(task => {
    return (
      <Task
        key={task.id}
        data={task}
        onCreate={createTask}
        onSave={isDuplicateTask}
        onEdit={updateTask}
      />
      );
    });
    
  // Add an empty task component if below max tasks
  const maxTasks = 5;

  return (
    <>
      <h1>Hello Dispatcher ({tasks.length || 0}/5 Tasks)</h1>
      {tasks.length < maxTasks && (
        <Task
          onCreate={createTask}
          onSave={isDuplicateTask}
        />
      )}
      {tasksList}
    </>
  );
}

export default App;
