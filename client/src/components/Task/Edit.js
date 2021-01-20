import { useState } from 'react';

export default function Edit(props) {

  // Set initial state to task data
  const [task, setTask] = useState(props.task);

  // Updates form fields
  const handleChange = (e, type) => {
    setTask(prev => {
      return { ...prev, [type]: e.target.value }
    });
  };
  
  return (
    <>
      <h2>Edit Task</h2>
      <form onSubmit={e => e.preventDefault()}>
        <label>Start Latitude:</label>
        <input 
          type='text'
          value={task.startLat || ''}
          onChange={e => handleChange(e, 'startLat')}
        ></input>
        <label>Start Longitude:</label>
        <input 
          type='text'
          value={task.startLng || ''}
          onChange={e => handleChange(e, 'startLng')}
        ></input>
        <br />
        <label>End Latitude:</label>
        <input 
          type='text' 
          value={task.endLat || ''}
          onChange={e => handleChange(e, 'endLat')}
        ></input>
        <label>End Longitude:</label>
        <input 
          type='text' 
          value={task.endLng || ''}
          onChange={e => handleChange(e, 'endLng')}
        ></input>
        <br />
        <label>Freight Description:</label>
        <input 
          type='text' 
          value={task.freight || ''}
          onChange={e => handleChange(e, 'freight')}
        ></input>
        <button 
          onClick={() => props.onSave(task)}
        >Save Changes</button>
      </form>
    </>
  );
}