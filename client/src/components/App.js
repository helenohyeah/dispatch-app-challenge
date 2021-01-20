import Task from './Task';
import Create from './Create';

import useTasks from '../hooks/useTasks';

import './App.css';

function App() {

  const { tasks, addTask, updateTask, deleteTask, isDuplicateTask } = useTasks();
  
  // console.log('App tasks:', tasks);
  const tasksList = tasks.map(task => {
    // console.log('tasksList task:', task);
    return (
      <Task
        key={task.id}
        data={task}
        onEdit={updateTask}
        onDelete={deleteTask}
      />
      );
    });
  // console.log('tasksList:', tasksList);
    
    return (
      <>
      <h1>Hello Dispatcher</h1>
      <Create
        onSave={isDuplicateTask}
        onAdd={addTask}
      />
      {tasksList}
    </>
  );
}

export default App;
